export default function flashScollPos() {
    const scrollPos = window.scrollY;
    window.sessionStorage.setItem("_flashed_scroll_pos", scrollPos);
}