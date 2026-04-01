// Импорт списка виджетов
import widgetsList from "@/genWidgets.js";

// Применение виджетов
export default function applyWidgets() {
    // Поиск всех элементов с атрибутом 'data-widget'
    const widgetElements = document.querySelectorAll('[data-widget]');

    // Итерация по найденным элементам
    widgetElements.forEach(async (element) => {
        // Получение имени виджета из атрибута 'data-widget'
        const widgetName = element.dataset["widget"];
        
        // Проверка наличия имени виджета
        if (!widgetName) {
            throw new Error("No widget name");
        }

        let widgetNames;
        if (widgetName.includes(",")) {
            widgetNames = widgetName.split(",").map((t) => t.trim());
        } else {
            widgetNames = [widgetName];
        }

        // Итерация по именам виджетов
        widgetNames.forEach(async function (widgetName) {
            // Получение импорта виджета из списка
            const widgetImport = widgetsList[widgetName];

            // Проверка наличия импорта для виджета
            if (!widgetImport) {
                throw new Error("Unknown widget: " + widgetName, element);
            }

            // Загрузка виджета
            const widgetLoader = await widgetImport();

            // Проверка успешной загрузки виджета
            if (!widgetLoader) {
                throw new Error("Can't load widget: " + widgetName);
            }

            // Получение экспорта виджета
            const widget = widgetLoader.default;

            // Проверка наличия экспорта виджета
            if (!widget) {
                return;
            }

            // Копирование данных из атрибутов элемента в объект
            const data = Object.assign({}, element.dataset);
            // Преобразование строковых значений JSON в объекты
            Object.keys(data).forEach(function(key) {
                const value = data[key];
                if (typeof value === 'string' || value instanceof String) {
                    try {
                        data[key] = JSON.parse(value);
                    } catch {}
                }
            });

            // Вызов функции виджета с элементом и данными
            widget(element, data);

            // Удаление класса 'widget-not-initialized' и добавление 'widget-initialized'
            element.classList.remove("widget-not-initialized");
            element.classList.add("widget-initialized");
        });
    });
}
