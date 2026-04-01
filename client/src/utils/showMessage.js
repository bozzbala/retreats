import showPopup from "@/utils/showPopup.js";

/**
 * Отображает всплывающее сообщение.
 * @param {string} html - HTML-код сообщения.
 * @param {Object} options - Дополнительные параметры для настройки отображения сообщения.
 */
export default async function showMessage(html, options) {
    // Объединяем дополнительные параметры с базовыми настройками сообщения
    const messageOptions = Object.assign({
        rootClass: "message"
    }, options);

    // Отображаем всплывающее сообщение с переданным HTML и параметрами
    showPopup(`<div class="popup-message">${html}</div>`, messageOptions);
}
