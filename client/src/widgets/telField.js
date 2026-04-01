import Cleave from 'cleave.js';

export default function telField(element, data) {
    const cleave = new Cleave(element, {
        prefix: '+7',
        delimiters: [' (', ') ', '-', '-'],
        blocks: [2, 3, 3, 2, 2],
        numericOnly: true,
        noImmediatePrefix: true,
    });

    element.closest("form").addEventListener("clear", function () {
        cleave.setRawValue("");
        element.value = "";
    })
};
