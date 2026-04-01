<template>
    <svg v-bind="attributes" v-html="svgInner"></svg>
</template>

<script>
// Этот компонент нарушает все принципы создания качественных SFC. Так и должно быть.

// Создание объекта парсера DOM для разбора SVG-текста
const parser = new DOMParser();

export default {
    // Свойства компонента
    props: {
        // Имя иконки в виде строки, обязательное свойство
        name: {
            type: String,
            required: true
        }
    },
    // Вычисляемые свойства компонента
    computed: {
        // Получение текста SVG для указанной иконки
        svgText() {
            // Проверка наличия иконки
            if (!this.$icon(this.name)) {
                console.error(`SvgIcon: ${this.name} not found`);
            }

            return this.$icon(this.name);
        },
        // Получение документа SVG из текста SVG
        svgDocument() {
            // Использование парсера DOM для создания документа SVG
            const document = parser.parseFromString(this.svgText, "image/svg+xml");
            return document;
        },
        // Получение внутреннего HTML документа SVG
        svgInner() {
            return this.svgDocument.documentElement.innerHTML;
        },
        // Преобразование атрибутов документа SVG в объект
        attributes() {
            const result = {};
            
            // Итерация по атрибутам документа SVG
            for (const attr of this.svgDocument.documentElement.attributes) {
                result[attr.name] = attr.value;
            }

            return result;
        }
    }
}
</script>
