/**
 * Преобразует HTML-строку в DOM-элемент и возвращает первый дочерний элемент контента шаблона.
 * @param {string} html - HTML-строка для преобразования в DOM-элемент.
 * @returns {HTMLElement} - DOM-элемент, представляющий первый дочерний элемент контента шаблона.
 */
export default function html2Element(html) {
    // Создаем элемент шаблона
    var template = document.createElement('template');

    // Удаляем лишние пробелы в начале и конце строки HTML
    html = html.trim();

    // Заполняем содержимое шаблона HTML-строкой
    template.innerHTML = html;

    // Возвращаем первый дочерний элемент контента шаблона
    return template.content.firstChild;
}