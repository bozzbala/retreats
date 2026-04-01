// Функция для очистки формы
export default async function clearForm(formElement) {
    // Сброс значений формы до исходных
    formElement.reset();

    // Имитация события "input" для всех элементов формы (чтобы обновить их состояние)
    formElement.querySelectorAll('input, textarea, select').forEach(function (element) {
        element.dispatchEvent(new CustomEvent("input"));
    });

    // Имитация события "clear" для формы
    formElement.dispatchEvent(new CustomEvent("clear"));
}
