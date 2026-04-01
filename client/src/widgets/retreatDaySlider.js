// Импорт Swiper и необходимых модулей и стилей
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css'; // Импорт основных стилей Swiper

// Вижет слайдера с использованием Swiper
export default function (element, data) {
    // Инициализация Swiper с переданным элементом и настройками
    element.swiper = new Swiper(element.querySelector(".swiper"), {
        modules: [Navigation], // Подключение необходимых модулей
        slidesPerView: "auto", // Количество отображаемых слайдов
        spaceBetween: 15,
        loop: false,
        slidesOffsetAfter: 20,
        slidesOffsetBefore: 20,
        navigation: {
            nextEl: element.querySelector(".swiper-button-next"), // Элемент для переключения на следующий слайд
            prevEl: element.querySelector(".swiper-button-prev"), // Элемент для переключения на предыдущий слайд
        }
    });
};

// @widgetLoadingMode:lazy-once