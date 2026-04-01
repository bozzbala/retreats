/**
 * Обрабатывает ответ от AJAX-запроса и вызывает соответствующие колбэки в зависимости от результата.
 * @param {Object} response - Объект ответа от сервера.
 * @param {Function} successCallback - Функция обратного вызова в случае успешного запроса.
 * @param {Function} errorCallback - Функция обратного вызова в случае ошибки запроса.
 */
export default function processAjaxResponse(response, successCallback, errorCallback) {
    if (response && response.code === 0) {
        const errorMessage = response.displayMsg || null;
        const payload = response.payload || null;

        // Если успешен, вызываем функцию обратного вызова для успешного запроса
        successCallback(errorMessage, payload);
    } else {
        // Если запрос не успешен, подготавливаем сообщение об ошибке и дополнительные данные
        let errorMessage = "Произошла ошибка";
        let errorData = null;

        if (response && response.displayMsg) {
            // Если есть сообщение об ошибке, записываем его в переменную
            console.error(response.displayMsg);
            errorMessage = "" + response.displayMsg;
        }

        if (response && response.payload) {
            // Если есть дополнительные данные, записываем их в переменную
            errorData = response.payload;
        }

        // Вызываем функцию обратного вызова для обработки ошибки
        errorCallback(errorMessage, errorData);
    }
}
