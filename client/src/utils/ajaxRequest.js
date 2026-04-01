// Функция для отправки асинхронного AJAX-запроса
export default async function ajaxRequest(url, data) {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (window.Application.config.x_parent_accept) {
            headers["X-Parent-Accept"] = window.Application.config.x_parent_accept;
        }

        if (window.Application.config.lang_id) {
            headers["X-Lang-Id"] = window.Application.config.lang_id;
        }

        if (window.Application.config.page_id) {
            headers["X-Page-Id"] = window.Application.config.page_id;
        }

        if (window.Application.config.content_id) {
            headers["X-Content-Id"] = window.Application.config.content_id;
        }

        if (window.Application.config.request_url) {
            headers["X-Request-Url"] = window.Application.config.request_url;
        }
        
        // Используем метод fetch для отправки POST-запроса
        return fetch(url, {
            method: 'POST', // Метод запроса
            mode: 'same-origin', // Режим запроса (один и тот же источник)
            cache: 'reload', // Кэширование (перезагрузка)
            credentials: 'same-origin', // Передача креденциалов (один и тот же источник)
            headers: headers, // HTTP-заголовки
            redirect: 'follow', // Редирект (следовать)
            referrerPolicy: 'same-origin', // Политика реферрера (один и тот же источник)
            body: JSON.stringify(data) // Преобразование данных в JSON и передача тела запроса
        }).then(async (response) => {
            // Обработка ответа
            const responseText = await response.text();

            try {
                // Попытка парсинга ответа как JSON
                return JSON.parse(responseText);
            } catch (err) {
                // Обработка ошибки парсинга
                return {
                    error: err
                };
            }
        });
    } catch (err) {
        // Обработка ошибки запроса
        return {
            error: err
        };
    }
}
