// Функция для клонирования объекта с использованием сериализации в JSON
export default function clone(object) {
    // Преобразование объекта в строку JSON и обратно для создания глубокой копии
    return JSON.parse(JSON.stringify(object));
}