// Импорт Swiper и необходимых модулей и стилей
import Swiper from 'swiper';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css'; // Импорт основных стилей Swiper

// Вижет слайдера с использованием Swiper
export default function (element, data) {
    // Инициализация Swiper с переданным элементом и настройками
    element.swiper = new Swiper(element.querySelector(".swiper"), {
        modules: [Navigation, FreeMode], // Подключение необходимых модулей
        slidesPerView: "auto", // Количество отображаемых слайдов
        spaceBetween: 10,
        freeMode: true,
        speed: 1000, // Скорость перехода между слайдами
        navigation: {
            nextEl: element.querySelector(".swiper-button-next"), // Элемент для переключения на следующий слайд
            prevEl: element.querySelector(".swiper-button-prev"), // Элемент для переключения на предыдущий слайд
        },
        slidesOffsetAfter: 20,
        slidesOffsetBefore: 20,
        breakpoints: {
            992: {
                spaceBetween: 20
            }
        }
    });
};

// @widgetLoadingMode:lazy-once