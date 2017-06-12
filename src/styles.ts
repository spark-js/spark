export function createStyles(styles: string = '') {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(styles));
    return style;
}