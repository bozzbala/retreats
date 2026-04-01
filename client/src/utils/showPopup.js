import html2Element from "@/utils/html2Element.js";
import noScroll from "@/utils/noScroll.js";

// Стек для управления отображением всплывающих окон
const popupsStack = [];
// Текущее отображаемое всплывающее окно
let currentPopup = null;

/**
 * Отображает всплывающее окно с переданным контентом и параметрами.
 * @param {string|HTMLElement} content - Контент всплывающего окна (HTML-код или DOM-элемент).
 * @param {Object} options - Дополнительные параметры для настройки отображения всплывающего окна.
 * @returns {Object} - Объект управления всплывающим окном.
 */
export default function showPopup(content, options) {
    // Создаем объект для управления всплывающим окном
    const control = {};
    
    // Добавляем всплывающее окно в стек
    popupsStack.push({
        content: content,
        options: options || {},
        control: control
    });

    // Обновляем стек отображаемых всплывающих окон
    updateStack();

    // Возвращаем объект управления всплывающим окном
    return control;
}

/**
 * Обновляет стек отображаемых всплывающих окон.
 */
function updateStack() {
    // Если уже отображается всплывающее окно или стек пуст, выходим из функции
    if (currentPopup || popupsStack.length < 1) {
        return;
    }

    // Получаем данные текущего всплывающего окна из стека
    currentPopup = popupsStack.shift();

    // Извлекаем контент и параметры
    const content = currentPopup.content;
    const options = currentPopup.options;

    // HTML-шаблон для всплывающего окна (можно задать через параметры)
    const template = options.template || `
        <div class="popup-overlay">
            <div class="popup-window">
                <button type="button" class="popup-close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="currentColor" d="m12 13.054-5.073 5.073a.73.73 0 0 1-.522.213.7.7 0 0 1-.532-.213.72.72 0 0 1-.217-.527q0-.31.217-.527L10.946 12 5.873 6.927a.73.73 0 0 1-.212-.522.7.7 0 0 1 .212-.532.72.72 0 0 1 .527-.217q.31 0 .527.217L12 10.946l5.073-5.073a.73.73 0 0 1 .522-.212.7.7 0 0 1 .532.212q.217.217.217.527a.72.72 0 0 1-.217.527L13.054 12l5.073 5.073q.208.209.213.522a.7.7 0 0 1-.213.532.72.72 0 0 1-.527.217.72.72 0 0 1-.527-.217z"/></svg>
                </button>
                <div class="popup-content"></div>
            </div>
        </div>
    `;

    // Создаем DOM-элемент на основе HTML-шаблона
    let popupElement = html2Element(template);
    const popupWindow = popupElement.querySelector('.popup-window');
    const popupCloseButton = popupElement.querySelector('.popup-close-button');
    const popupContent = popupElement.querySelector('.popup-content');
    
    // Добавляем пользовательский класс к корневому элементу, если указан в параметрах
    if (options.rootClass) {
        if (Array.isArray(options.rootClass)) {
            options.rootClass.forEach(c => popupElement.classList.add(c));
        } else if (typeof options.rootClass === 'string' || options.rootClass instanceof String) {
            popupElement.classList.add(options.rootClass);
        }
    }

    // Заполняем содержимое всплывающего окна
    if (typeof content === 'string' || content instanceof String) {
        popupContent.innerHTML = content;
    } else if (content instanceof HTMLElement) {
        popupContent.appendChild(content);
    } else {
        // Если контент не является строкой или DOM-элементом, удаляем всплывающее окно и обновляем стек
        popupElement.remove();
        updateStack();
    }

    // Навешиваем обработчики событий для закрытия всплывающего окна
    popupElement.addEventListener("click", close);
    popupCloseButton.addEventListener("click", close);
    popupWindow.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Задержка перед добавлением класса "visible" для анимации
    setTimeout(function () {
        if (popupElement) {
            popupElement.classList.add("visible");
        }
        noScroll.hideScroll();
    }, 10);

    // Функция для закрытия всплывающего окна
    function close() {
        // Вызываем колбэк onClose, если он указан в параметрах
        if (currentPopup.options.onClose) {
            currentPopup.options.onClose();
        }
        
        // Сбрасываем текущее всплывающее окно
        currentPopup = null;

        // Удаляем всплывающее окно с анимацией и восстанавливаем прокрутку
        if (popupElement) {
            popupElement.addEventListener("transitionend", function(event) {
                if (popupElement) {
                    // Если указан параметр keepContentOnClose, восстанавливаем контент в исходное положение
                    if (options.keepContentOnClose) {
                        document.body.appendChild(content);
                    }

                    // Удаляем всплывающее окно из DOM
                    popupElement.remove();
                    popupElement = null;
                    noScroll.showScroll();
                }
            });

            // Убираем класс "visible" для запуска анимации закрытия
            popupElement.classList.remove("visible");
        }
        
        // Обновляем стек отображаемых всплывающих окон
        updateStack();
    }

    // Добавляем функцию закрытия всплывающего окна в объект управления
    currentPopup.control.close = close;

    // Добавляем всплывающее окно в DOM
    document.body.appendChild(popupElement);
}
