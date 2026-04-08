import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

export default function (element, data) {
    element.swiper = new Swiper(element.querySelector(".swiper"), {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 15,
        loop: false,
        slidesOffsetAfter: 20,
        slidesOffsetBefore: 20,
        navigation: {
            nextEl: element.querySelector(".swiper-button-next"),
            prevEl: element.querySelector(".swiper-button-prev"),
        }
    });

    element.addEventListener('click', function (e) {
        const openBtn = e.target.closest('.day-details-btn');
        const closeBtn = e.target.closest('.day-details-close');

        if (openBtn) {
            const slide = openBtn.closest('.swiper-slide');
            if (slide) slide.classList.add('details-open');
        }

        if (closeBtn) {
            const slide = closeBtn.closest('.swiper-slide');
            if (slide) slide.classList.remove('details-open');
        }
    });
};

// @widgetLoadingMode:lazy-once