import { nanoid } from 'nanoid';

// Виджет для сворачиваемых блоков (аккордеонов)
export default function (element, data) {
    // Генерация уникального идентификатора для данного сворачиваемого блока
    const id = nanoid();
    // Часть аккордеона? (по умолчанию "none")
    const accordion = data.accordion || "none";
    // Исходное состояние блока (по умолчанию "closed", может быть "open")
    const initialState = (data.state || "closed") == "open";
    // Элементы сворачиваемого блока: кнопка переключения, контейнер и содержимое
    const toggle = element.querySelector(".collapse-toggle");
    const wrap = element.querySelector(".collapse-wrap");
    const content = element.querySelector(".collapse-content");

    // Переменная для отслеживания текущего состояния блока (открыто или закрыто)
    let isOpen = initialState;

    // Обработчик события "click" для кнопки переключения блока
    toggle.addEventListener("click", function () {
        // Переключение состояния блока при каждом клике
        if (!isOpen) {
            open();
        } else {
            close();
        }
    });

    // Обработчик события "transitionend" для завершения анимации
    wrap.addEventListener("transitionend", function () {
        // Если блок открыт, установить высоту контейнера в "auto" после завершения анимации
        if (isOpen) {
            wrap.style.height = "auto";
            wrap.style.overflow = "visible";
        }
    });

    // Обработчик события "collapseOpen", вызываемого при открытии другого сворачиваемого блока
    window.addEventListener("collapseOpen", function (event) {
        // Если событие относится к другому блоку, закрыть текущий блок
        if (event.detail.accordion && event.detail.accordion != "none" && event.detail.accordion == accordion && event.detail.id != id) {
            close();
        }
    });

    // Инициализация состояния блока при загрузке страницы
    if (initialState) {
        element.classList.add("collapse-open");
        open();
    } else {
        close();
    }

    // Функция для открытия блока
    function open() {
        // Если блок не открыт, установить состояние "открыто"
        if (!isOpen) {
            isOpen = true;
            // Получение высоты содержимого
            const height = content.offsetHeight;

            // Добавление класса для открытого состояния и установка высоты и overflow для анимации
            element.classList.add("collapse-open");
            wrap.style.height = height + "px";
            wrap.style.overflow = "hidden";

            // Генерация события "collapseOpen" для оповещения других сворачиваемых блоков
            window.dispatchEvent(new CustomEvent("collapseOpen", {
                detail: {
                    id: id,
                    accordion: accordion
                }
            }));
        } else {
            // Если блок уже открыт, установить высоту и overflow в "auto"
            wrap.style.height = "auto";
            wrap.style.overflow = "visible";
        }
    }

    // Функция для закрытия блока
    function close() {
        // Установка overflow в "hidden" перед закрытием
        wrap.style.overflow = "hidden";

        // Если блок открыт, выполнить анимацию закрытия
        if (isOpen) {
            isOpen = false;
            // Получение высоты содержимого
            const height = content.offsetHeight;

            // Удаление класса открытого состояния, установка высоты и запуск анимации
            element.classList.remove("collapse-open");
            wrap.style.height = height + "px";
            // Установка таймаута для начала анимации после установки высоты
            setTimeout(function () {
                wrap.style.height = "0px";
            }, 1);
        } else {
            // Если блок уже закрыт, установить высоту в "0px"
            wrap.style.height = "0px";
        }
    }
}

// @widgetLoadingMode:lazy-once
// @widgetLoadingChunk:secondary