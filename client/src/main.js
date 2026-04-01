// Подключение стилей сброса и нормализации
import 'modern-normalize/modern-normalize.css';

// Пример подключение шрифта из @fontsource
//import '@fontsource-variable/montserrat/wght.css';
//import '@fontsource-variable/montserrat/wght-italic.css';

// Подключение основных стилей проекта
import "@/styles/main.scss";

// Импорт функций из модулей
import detectTouchDevice from "@/core/detectTouchDevice.js";
import processLinks from "@/core/processLinks.js";
import applyIcons from "@/core/applyIcons.js";
import applyWidgets from "@/core/applyWidgets.js";
import calcScrollbarWidth from "@/core/calcScrollbarWidth.js";
import onDomReady from "@/utils/onDomReady.js";

// Выполнение кода после полной загрузки DOM
onDomReady(function () {
    detectTouchDevice(); // Обнаружение устройств с сенсорными экранами
    calcScrollbarWidth(); // Расчет ширины полосы прокрутки
    processLinks(); // Обработка ссылок
    applyWidgets(); // Применение виджетов
    applyIcons(); // Применение иконок   
});
