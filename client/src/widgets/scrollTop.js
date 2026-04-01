// Виджет для прокрутки страницы вверх при клике на элемент
export default function scrollToTop(element, data) {
    // Добавление слушателя события "click" на элемент
    element.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Добавление слушателя события "scroll" на окно
    window.addEventListener('scroll', () => {
        // Получение текущей позиции прокрутки
        const scrollPos = window.scrollY;

        // Если позиция прокрутки больше 200px, добавить класс "visible" к элементу, иначе удалить
        if (scrollPos > 200) {
            element.classList.add("visible");
        } else {
            element.classList.remove("visible");
        }
    }, {
        passive: true // Установка пассивного режима для оптимизации производительности
    });
};
