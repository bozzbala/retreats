// Импорт необходимых утилит и функций
import serializeForm from "@/utils/serializeForm.js";
import ajaxRequest from "@/utils/ajaxRequest.js";
import processAjaxResponse from "@/utils/processAjaxResponse.js";
import showMessage from "@/utils/showMessage.js";
import clearForm from "@/utils/clearForm.js";

// Виджет формы, отправляемой по AJAX. Совместим со старым кодом.
export default function (element, data) {
    // Получение URL из атрибута "action" формы
    const url = element.action;
    // Опция для предотвращения очистки формы после отправки (по умолчанию false)
    const noClear = data.noClear || false;
    // Флаг для предотвращения повторной отправки формы во время обработки
    let preventSend = false;

    // Обработчик события "submit" формы
    element.addEventListener("submit", async function (event) {
        // Предотвращение стандартного поведения формы (перезагрузка страницы)
        event.preventDefault();

        // Проверка флага для предотвращения повторной отправки формы
        if (preventSend) {
            return;
        }

        // Сериализация данных формы
        const formData = serializeForm(element);

        // Удаление класса ошибок у всех элементов формы
        element.querySelectorAll('.field-error').forEach(fieldElement => fieldElement.classList.remove("field-error"));

        // Установка флага для предотвращения повторной отправки
        preventSend = true;
        // Установка атрибута "readOnly" для всех элементов формы
        Array.from(element.elements).forEach(formElement => formElement.readOnly = true);
        // Добавление класса "loading" для отображения индикатора загрузки
        element.classList.add("loading");

        // Отправка данных формы через AJAX
        const response = await ajaxRequest(url, formData);

        // Удаление класса "loading" после завершения запроса
        element.classList.remove("loading");
        // Снятие атрибута "readOnly" с элементов формы
        Array.from(element.elements).forEach(formElement => formElement.readOnly = false);
        // Сброс флага для предотвращения повторной отправки
        preventSend = false;

        // Обработка ответа от сервера
        processAjaxResponse(response, (message, data) => { // В случае успеха
            // Если опция noClear не установлена, очистить форму
            if (!noClear) {
                clearForm(element);
            }
            // Отображение сообщения об успехе
            showMessage(message);
            window.dispatchEvent(new CustomEvent("closeformpopup"));
        }, (message, data) => { // В случае ошибки
            // Отображение сообщения об ошибке
            showMessage(message);

            // Проверка наличия данных об ошибках и выделение соответствующих полей
            if (data && data.errorFields) {
                data.errorFields.forEach(field => {
                    const fieldElement = element.querySelector('*[name="' + field + '"]');
                    if (fieldElement) {
                        const parentElement = fieldElement.closest('.field-error-target');

                        // Выделение родительского элемента, если он существует, иначе выделение самого поля
                        if (parentElement) {
                            parentElement.classList.add("field-error");
                        } else {
                            fieldElement.classList.add("field-error");
                        }
                    }
                });
            }
        });
    });

    // Добавление слушателя события "input" для каждого поля формы
    element.querySelectorAll("input, textarea, select").forEach(fieldElement => {
        fieldElement.addEventListener("input", function () {
            // Удаление класса ошибки при вводе данных
            fieldElement.classList.remove("field-error");

            // Проверка и удаление класса ошибки у родительского элемента, если он существует
            const parentElement = fieldElement.closest('.field-error-target');
            if (parentElement) {
                parentElement.classList.remove("field-error");
            }
        });
    });
}
