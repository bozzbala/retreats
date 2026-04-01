import { set as lodashSet } from "lodash-es";

/**
 * Сериализует данные формы в объект.
 * @param {HTMLFormElement} formElement - Элемент формы для сериализации.
 * @returns {Object} - Объект с данными формы.
 */
export default function serializeForm(formElement) {
    // Создаем объект для хранения данных формы
    const formDataObject = {};

    // Создаем объект FormData для удобного доступа к данным формы
    const formData = new FormData(formElement);

    // Итерируем по ключам FormData и добавляем их в объект formDataObject
    for (const key of formData.keys()) {
        lodashSet(formDataObject, key, formData.get(key));
    }

    // Возвращаем объект с данными формы
    return formDataObject;
}
