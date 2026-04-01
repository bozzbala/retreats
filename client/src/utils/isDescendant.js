/**
 * Проверяет, является ли элемент потомком указанного родительского элемента.
 * @param {HTMLElement} parent - Родительский элемент.
 * @param {HTMLElement} child - Потомок, для которого выполняется проверка.
 * @returns {boolean} - Возвращает true, если child является потомком parent, в противном случае возвращает false.
 */
export default function isDescendant(parent, child) {
    // Инициализируем переменную node значением parentNode child
    var node = child.parentNode;

    // Итеративно поднимаемся по дереву родителей child
    while (node != null) {
        // Если текущий родитель совпадает с указанным родительским элементом, возвращаем true
        if (node == parent) {
            return true;
        }

        // Переходим к родителю текущего узла
        node = node.parentNode;
    }

    // Если не найден совпадающий родитель, возвращаем false
    return false;
}
