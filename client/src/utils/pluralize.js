// Импортируем функции для множественного числа на разных языках
import ruPluralize from "./ruPluralize.js";
import kkPluralize from "./kkPluralize.js";
import enPluralize from "./enPluralize.js";

// Функция для выбора правильной формы множественного числа в зависимости от языка
export default function pluralize(number, strings, langCode) {
    // Проверяем код языка и вызываем соответствующую функцию
    if (langCode === "ru") {
        return ruPluralize(number, strings);
    } else if (langCode === "kk") {
        return kkPluralize(number, strings);
    } else {
        // По умолчанию используем английский вариант
        return enPluralize(number, strings);
    }
}
