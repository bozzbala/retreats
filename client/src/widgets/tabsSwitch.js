// Виджет для управления переключением вкладок (табов)
export default function (element, data) {
    // Для каждой кнопки-вкладки внутри элемента
    element.querySelectorAll(".switch-tab").forEach(function (button) {
        // Получение имени события и детали события из атрибутов данных
        const eventName = data.event;
        const eventDetail = button.dataset.eventDetail;

        // Если указаны имя события и детали, добавить слушателя события
        if (eventName && eventDetail) {
            window.addEventListener(eventName, function (event) {
                // Проверка, совпадают ли детали события с заданными
                if (event.detail == eventDetail) {
                    // Активация вкладки и прокрутка элемента в представление (плавная прокрутка)
                    activate();
                    element.scrollIntoView({ behavior: "smooth" });
                }
            });
        }

        // Добавление слушателя события "click" для активации вкладки при клике
        button.addEventListener("click", activate);

        // Функция для активации вкладки
        function activate() {
            // Получение селектора содержимого, режима отображения и активации кнопки
            const contentSelector = button.dataset.switchContentSelector;
            const displayMode = button.dataset.switchDisplayMode || "block";

            // Снятие класса "current" у всех кнопок и добавление его текущей
            element.querySelectorAll(".switch-tab").forEach((button) => button.classList.remove("current"));
            button.classList.add("current");

            // Скрытие всех блоков содержимого и отображение соответствующего блока
            element.querySelectorAll(".switch-content").forEach((content) => content.style.display = 'none');
            element.querySelectorAll(contentSelector).forEach((content) => content.style.display = displayMode);
        }
    });

    // Установка первой кнопки в качестве активной вкладки
    const firstButton = element.querySelector(".switch-tab");
    const contentSelector = firstButton.dataset.switchContentSelector;
    const displayMode = firstButton.dataset.switchDisplayMode || "block";
    firstButton.classList.add("current");
    element.querySelectorAll(".switch-content").forEach((content) => content.style.display = 'none');
    element.querySelectorAll(contentSelector).forEach((content) => content.style.display = displayMode);
}

// @widgetLoadingMode:lazy-once
// @widgetLoadingChunk:secondary