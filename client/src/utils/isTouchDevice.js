/**
 * Проверяет, является ли устройство сенсорным (с поддержкой события touchstart).
 * @returns {boolean} - Возвращает true, если устройство сенсорное, в противном случае возвращает false.
 */
export default function isTouchDevice() {
    // Проверяем наличие события touchstart в объекте window или поддержку максимального количества точек прикосновения
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}
