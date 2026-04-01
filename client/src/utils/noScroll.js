import { debounce } from "lodash-es";

// Счетчик для отслеживания вызовов функций hideScroll и showScroll
let counter = 0;

// Функция обновления класса body с использованием debounce
const update = debounce(function () {
    // Если счетчик больше нуля, добавляем класс "no-scroll", иначе убираем его
    if (counter > 0) {
        document.body.classList.add("no-scroll");
    } else {
        document.body.classList.remove("no-scroll");
    }
}, 30);

// Экспортируемый объект с методами hideScroll и showScroll
export default {
    /**
     * Увеличивает счетчик и запускает функцию обновления.
     */
    hideScroll() {
        counter++;
        update();
    },
    /**
     * Уменьшает счетчик и запускает функцию обновления.
     */
    showScroll() {
        counter--;
        update();
    }
};
