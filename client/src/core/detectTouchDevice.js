// Импорт функции для определения, является ли устройство сенсорным
import isTouchDevice from "@/utils/isTouchDevice.js";

// Определения типа устройства и добавления соответствующего класса к body
export default function detectTouchDevice() {
    // Проверка, является ли устройство сенсорным
    if (isTouchDevice()) {
        // Добавление класса 'touch-device' к body в случае сенсорного устройства
        document.body.classList.add("touch-device");
    } else {
        // Добавление класса 'non-touch-device' к body в случае несенсорного устройства
        document.body.classList.add("non-touch-device");
    }
}