"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["secondary"],{

/***/ "./node_modules/nanoid/index.browser.js"
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customAlphabet: () => (/* binding */ customAlphabet),
/* harmony export */   customRandom: () => (/* binding */ customRandom),
/* harmony export */   nanoid: () => (/* binding */ nanoid),
/* harmony export */   random: () => (/* binding */ random),
/* harmony export */   urlAlphabet: () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step | 0
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte > 62) {
      id += '-'
    } else {
      id += '_'
    }
    return id
  }, '')



/***/ },

/***/ "./node_modules/nanoid/url-alphabet/index.js"
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   urlAlphabet: () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



/***/ },

/***/ "./src/widgets/collapse.js"
/*!*********************************!*\
  !*** ./src/widgets/collapse.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");


// Виджет для сворачиваемых блоков (аккордеонов)
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(element, data) {
    // Генерация уникального идентификатора для данного сворачиваемого блока
    const id = (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)();
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

/***/ },

/***/ "./src/widgets/tabsSwitch.js"
/*!***********************************!*\
  !*** ./src/widgets/tabsSwitch.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Виджет для управления переключением вкладок (табов)
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(element, data) {
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

/***/ }

}]);
//# sourceMappingURL=secondary.4c4b85a2827e394056f0.js.map