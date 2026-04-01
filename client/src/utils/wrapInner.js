/**
 * Добавляет HTML-код до и после существующего содержимого элемента.
 * @param {string} before - HTML-код, который будет добавлен перед существующим содержимым.
 * @param {HTMLElement} element - HTML-элемент, к которому будет применено изменение.
 * @param {string} after - HTML-код, который будет добавлен после существующего содержимого.
 */
export default function appendHtml(before, element, after) {
    // Сохраняем текущий HTML-код элемента
    const orgHtml = element.innerHTML;
    
    // Создаем новый HTML-код, объединяя переданный, текущий и после переданного содержимого
    const newHtml = before + orgHtml + after;
    
    // Устанавливаем новый HTML-код в элемент
    element.innerHTML = newHtml;
}
