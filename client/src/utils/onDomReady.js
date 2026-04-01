/**
 * Выполняет заданную функцию после полной загрузки DOM.
 * @param {Function} callback - Функция, которую необходимо выполнить после загрузки DOM.
 */
export default function onDomReady(callback) {
    // Проверяем, находится ли DOM в состоянии загрузки
    if (document.readyState === 'loading') {
        // Если DOM все еще загружается, добавляем слушатель события DOMContentLoaded
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        // Если DOM уже загружен, вызываем функцию обратного вызова немедленно
        callback();
    }    
}
