// Функция для кодирования строки в соответствии с RFC 3986
export default function encodeRFC3986URIComponent(str) {
    // Используем стандартную функцию encodeURIComponent для кодирования строки
    return encodeURIComponent(str).replace(
        // Заменяем специальные символы (не входящие в безопасный набор) на их шестнадцатеричное представление
        /[!'()*]/g,
        (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
    );
}
