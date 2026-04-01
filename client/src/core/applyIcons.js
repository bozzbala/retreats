// Импорт списка иконок
import iconsList from "@/genIcons.js";
// Импорт утилиты для создания элемента из HTML-строки
import html2Element from "@/utils/html2Element.js";

// Функция для извлечения атрибутов из SVG строки
function extractSvgAttributes(svgString) {
  const match = svgString.match(/<svg[^>]*>/);
  if (!match) return {};

  const svgTag = match[0];
  const attributes = {};

  // Извлекаем viewBox
  const viewBoxMatch = svgTag.match(/viewBox=["']([^"']+)["']/);
  if (viewBoxMatch) {
    attributes.viewBox = viewBoxMatch[1];
  }

  // Извлекаем width
  const widthMatch = svgTag.match(/width=["']([^"']+)["']/);
  if (widthMatch) {
    attributes.width = widthMatch[1];
  }

  // Извлекаем height
  const heightMatch = svgTag.match(/height=["']([^"']+)["']/);
  if (heightMatch) {
    attributes.height = heightMatch[1];
  }

  return attributes;
}

// Функция для извлечения содержимого SVG (без тегов <svg>)
function extractSvgContent(svgString) {
  return svgString.replace(/<\/?svg[^>]*>/g, "").trim();
}

// Функция для создания SVG спрайта
function createSvgSprite() {
  // Проверяем, не создан ли уже спрайт
  if (document.getElementById("svg-sprite")) {
    return;
  }

  let spriteContent = '<svg id="svg-sprite" style="display: none;">';

  // Создаем symbol для каждой иконки
  Object.entries(iconsList).forEach(([iconName, svgString]) => {
    const attributes = extractSvgAttributes(svgString);
    const content = extractSvgContent(svgString);

    spriteContent += `<symbol id="icon-${iconName}"`;

    // Добавляем viewBox если есть
    if (attributes.viewBox) {
      spriteContent += ` viewBox="${attributes.viewBox}"`;
    }

    spriteContent += ` fill="none">${content}</symbol>`;
  });

  spriteContent += "</svg>";

  // Вставляем спрайт в начало body
  document.body.insertAdjacentHTML("afterbegin", spriteContent);
}

// Функция для создания SVG элемента с use
function createSvgUseElement(iconName, originalElement) {
  const iconData = iconsList[iconName];
  if (!iconData) return null;

  const attributes = extractSvgAttributes(iconData);

  let svgElement = "<svg";

  // Применяем размеры из оригинальной иконки или атрибутов элемента
  const width = originalElement.dataset.width || attributes.width || "24";
  const height = originalElement.dataset.height || attributes.height || "24";

  svgElement += ` width="${width}" height="${height}"`;

  // Добавляем viewBox если есть
  if (attributes.viewBox) {
    svgElement += ` viewBox="${attributes.viewBox}"`;
  }

  svgElement += `><use href="#icon-${iconName}"></use></svg>`;

  return html2Element(svgElement);
}

// Основная функция подстановки иконок
export default function applyIcons() {
  setTimeout(function () {
    // Создаем спрайт один раз
    createSvgSprite();

    // Обработка элементов с data-icon (замена элемента)
    const iconElements = document.querySelectorAll("[data-icon]");

    iconElements.forEach((element) => {
      const iconName = element.dataset["icon"];

      if (!iconName) {
        console.log(element);
        throw new Error("No icon name");
      }

      if (!iconsList[iconName]) {
        console.log(element);
        throw new Error("Unknown icon: " + iconName);
      }

      // Создаем новый SVG элемент с use
      const newElement = createSvgUseElement(iconName, element);

      if (newElement) {
        // Копируем классы из исходного элемента
        for (const className of element.classList) {
          newElement.classList.add(className);
        }

        // Копируем остальные атрибуты кроме data-icon
        Array.from(element.attributes).forEach((attr) => {
          if (attr.name !== "data-icon" && attr.name !== "class") {
            newElement.setAttribute(attr.name, attr.value);
          }
        });

        // Заменяем элемент
        element.parentNode.insertBefore(newElement, element);
        element.remove();
      }
    });

    // Обработка элементов с data-icon-inside (вставка внутрь)
    const iconInsideElements = document.querySelectorAll("[data-icon-inside]");

    iconInsideElements.forEach((element) => {
      const iconName = element.dataset["iconInside"];

      if (!iconName) {
        console.log(element);
        throw new Error("No icon name");
      }

      if (!iconsList[iconName]) {
        console.log(element);
        throw new Error("Unknown icon: " + iconName);
      }

      // Создаем SVG элемент с use
      const svgElement = createSvgUseElement(iconName, element);

      if (svgElement) {
        // Заменяем содержимое элемента
        element.innerHTML = svgElement.outerHTML;
      }
    });
  }, 10);
}

// Функция для ручного добавления иконок
export function addIcon(iconName, targetElement, options = {}) {
  createSvgSprite();

  if (!iconsList[iconName]) {
    throw new Error("Unknown icon: " + iconName);
  }

  const svgElement = createSvgUseElement(iconName, {
    dataset: {
      width: options.width,
      height: options.height,
    },
  });

  if (options.replace) {
    targetElement.innerHTML = svgElement.outerHTML;
  } else {
    targetElement.appendChild(svgElement);
  }
}
