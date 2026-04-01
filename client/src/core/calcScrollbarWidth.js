// Вычисление толщины скроллбара браузера
export default function calcScrollbarWidth() {
    // Задержка выполнения функции на 10 миллисекунд
    setTimeout(() => {
        // Создание внешнего элемента div
        const outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.overflow = "scroll";
        outer.style.msOverflowStyle = "scrollbar";
        // Добавление внешнего элемента в конец body
        document.body.appendChild(outer);

        // Создание внутреннего элемента div внутри внешнего
        const inner = document.createElement("div");
        outer.appendChild(inner);

        // Вычисление ширины скроллбара путем вычитания ширины внутреннего элемента из ширины внешнего
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

        // Удаление внешнего элемента
        outer.parentNode.removeChild(outer);

        // Установка пользовательской переменной CSS с толщиной скроллбара в корневом элементе HTML
        document.documentElement.style.setProperty(
            "--scrollbar-width",
            scrollbarWidth + "px"
        );
    }, 10);
}