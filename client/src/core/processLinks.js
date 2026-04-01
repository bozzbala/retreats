import flashScollPos from "@/utils/flashScrollPos";

// Функция для проверки, является ли ссылка внешней
function isExternal(location) {
    // Создание объекта URL с заданным адресом и базовым адресом текущей страницы
    const url = new URL(location, window.location.href);
    // Сравнение хостов ссылки и текущей страницы
    return url.host !== window.location.host;
}

// Обработка ссылок
export default function processLinks() {
    // Поиск всех элементов 'a' на странице
    const linksElements = document.querySelectorAll('a');

    // Итерация по найденным элементам
    linksElements.forEach(async (element) => {
        // Получение атрибута 'href' из элемента
        const href = element.href;
        // Проверка наличия атрибутов 'data-fancybox', 'data-fancybox-group' и 'data-iframe'
        const useFancybox = element.dataset.fancybox;
        const useGroup = element.dataset.fancyboxGroup;
        let useGallery = element.dataset.fancyboxGallery;
        const useIframe = element.dataset.iframe;
        const flashScrollPos = element.dataset.flashScrollPos;

        if (useGallery && (typeof useGallery === 'string' || useGallery instanceof String)) {
            useGallery = JSON.parse(useGallery);
        }

        // Если используется iframe
        if (useIframe !== undefined) {
            // Добавление слушателя события click
            element.addEventListener("click", async function (event) {
                // Отмена стандартного действия по клику
                event.preventDefault();
                // Динамический импорт модуля fancybox.js
                const Fancybox = await import("@/utils/fancybox.js");
                const fancybox = Fancybox.default;

                // Показ iframe в Fancybox
                fancybox.show([
                    {
                        src: href,
                        type: "iframe",
                        preload: false
                    },
                ], {
                    mainClass: "no-paddings"
                });
            });
        }
        // Если используется Fancybox
        else if (useFancybox !== undefined) {
            // Добавление слушателя события click
            element.addEventListener("click", async function (event) {
                // Отмена стандартного действия по клику
                event.preventDefault();
                // Динамический импорт модуля fancybox.js
                const Fancybox = await import("@/utils/fancybox.js");
                const fancybox = Fancybox.default;

                // Если указана группа изображений для Fancybox
                if (useGroup) {
                    // Поиск всех элементов с атрибутом 'data-fancybox-group' равным указанной группе
                    const elements = Array.from(window.document.querySelectorAll('[data-fancybox-group="' + useGroup + '"]'));

                    // Подготовка данных для Fancybox из элементов группы
                    const fancyboxElements = elements.map(function (galleryElement) {
                        return {
                            src: galleryElement.href,
                            type: getType(galleryElement.href),
                            preload: false,
                        };
                    });

                    // Показ группы изображений в Fancybox с указанием стартового индекса
                    fancybox.show(fancyboxElements, {
                        startIndex: elements.indexOf(element)
                    });
                } else if (useGallery) {
                    fancybox.show(useGallery)
                } else {
                    // Показ одиночного изображения в Fancybox
                    fancybox.show([
                        {
                            src: href,
                            type: getType(href),
                            preload: false,
                        },
                    ]);
                }
            });
        }
        // Если ссылка внешняя
        else if (isExternal(href)) {
            // Установка атрибутов 'target' для открытия ссылки в новой вкладке
            element.setAttribute("target", "_blank");
        } else if (flashScrollPos) {
            element.addEventListener("click", function () {
                flashScollPos();
            });
        }
    });
    
    function getType(src) {
        if (src.match(/\.(mp4|webm|ogg)$/i)) return "html5video";
        if (src.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)) return "image";
    
        return "image";
    }
}
