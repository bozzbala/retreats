// Импортируем функцию pluralize для формирования строки во множественной форме
import pluralize from "./pluralize.js";

/**
 * Функция для применения множественной формы и форматирования числа с учётом языка
 * @param {number} number - Число, для которого нужно сформировать множественную форму и отформатировать
 * @param {string[]} strings - Массив строк для различных форм числа
 * @param {string} langCode - Код языка ("ru", "en", "kk")
 * @returns {string} - Отформатированная строка с применённой множественной формой
 */
export default function pluralizeAndApply(number, strings, langCode) {
    // Вызываем функцию pluralize для получения множественной формы
    const pluralizedString = pluralize(number, strings, langCode);

    // Определяем код языка для форматирования числа
    const localeCode = langCode === "en" ? "en-US" : "ru-RU";

    // Заменяем в строке [NUM] на отформатированное число с разделителем тысяч
    return pluralizedString.split("[NUM]").join(number.toLocaleString(localeCode));
}