// Импорт необходимых библиотек и компонента
import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import SvgIcon from '@/core/SvgIcon.vue';
import icons from "@/genIcons.js";

// Создание хранилища Pinia
const pinia = createPinia();

// Cоздания Vue-виджета
export default function createVueWidget(component, element, data) {
    // Инициализация слотов для компонента Vue
    const slots = {};
    
    // Слот по умолчанию для элемента
    const defaultSlotHtml = element.innerHTML;
    slots.default = () => h("div", { class: "vue-slot vue-slot-default", innerHTML: defaultSlotHtml });

    // Именованные слоты для элемента
    const namedSlots = element.querySelectorAll('[data-vue-slot]');
    namedSlots.forEach(async (element) => {
        // Получение имени и класса именованного слота
        const slotName = element.dataset["vueSlot"];
        const className = slotName.replace(/\s+/g, '-').toLowerCase(); // TODO: реализовать более сложное преобразование из camelCase или PascalCase в kebab-case
        const slotHtml = element.innerHTML;
        // Добавление слота в словарь
        slots[slotName] = () => h("div", { class: "vue-slot vue-slot-named vue-slot-" + className, innerHTML: slotHtml });
    });

    // Удаление атрибута 'widget' из данных
    delete data.widget;

    // Создание экземпляра Vue-приложения
    const app = createApp({
        // Функция рендеринга, использующая переданный компонент, данные и слоты
        render() {
            return h(component, data, slots)
        }
    });

    // Использование хранилища Pinia в приложении
    app.use(pinia);

    // Добавление mixin для работы с языками
    app.mixin({
        computed: {
            $langCodePrefix() {
                return window.Application.config.lang_code_prefix;
            },
        },
    });

    // Добавление mixin для работы с строками
    app.mixin({
        methods: {
            $s(name) {
                return (window.cms_strings || {})[name] || "";
            },
        },
    });
    
    // Добавление mixin для работы со значениями
    app.mixin({
        methods: {
            $v(name) {
                return (window.cms_values || {})[name] || "";
            },
        },
    });

    // Добавление mixin для работы с иконками
    app.mixin({
        methods: {
            $icon(name) {
                return icons[name];
            },
        },
    });

    // Добавление mixin для форматирования чисел и цен
    app.mixin({
        methods: {
            $numberFormat(value) {
                return parseFloat(value).toLocaleString("ru");
            },
            $priceFormat(value) {
                return this.$numberFormat(value) + " ₸";
            },
        },
    });

    // Регистрация компонента 'svg-icon'
    app.component('svg-icon', SvgIcon);
    
    // Монтирование приложения в элемент
    app.mount(element);
}
