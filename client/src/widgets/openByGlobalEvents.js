import noScroll from "@/utils/noScroll.js";

export default function (element, data) {
    const openEvent = data.openEvent;
    const closeEvent = data.closeEvent;
    const noscroll = data.noscroll;

    window.addEventListener(openEvent, function () {
        element.classList.add("open");
        if (noscroll) {
            noScroll.hideScroll();
        }
    });
    
    window.addEventListener(closeEvent, function () {
        element.classList.remove("open");
        if (noscroll) {
            noScroll.showScroll();
        }
    });
}
