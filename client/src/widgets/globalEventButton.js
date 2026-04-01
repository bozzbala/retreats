export default function (element, data) {
    const clickEvent = data.clickEvent;
    
    element.addEventListener("click", function () {
        window.dispatchEvent(new Event(clickEvent));
    });
}
