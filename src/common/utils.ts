
const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
const REVERSE_KEBAB_REGEX = /-[a-z\u00E0-\u00F6\u00F8-\u00FE]/g;

/**
 * Returns kebabCase string. ie:
 * lastName -> last-name
 * WebkitAnimate -> -webkit-animate
 * @param value 
 */
export function kebab(value: string): string {
    return value.replace(KEBAB_REGEX, (match) => '-' + match.toLowerCase());
}

/**
 * Reverses a kebabCase string. ie:
 * last-name -> lastName
 * -webkit-animate -> WebkitAnimate
 * @param value 
 */
export function reverseKebab(value: string): string {
    return value.replace(REVERSE_KEBAB_REGEX, (match) => match.slice(1).toUpperCase());
}

export function setAttribute(propertyKey: string, value: any, component: HTMLElement) {
    const attrName = kebab(propertyKey);

    if (typeof value === 'boolean') {
        component.setAttribute(attrName, '' + value);
        return;
    }

    if (value) {
        component.setAttribute(attrName, value);
    } else {
        component.removeAttribute(attrName);
    }
}

export function debounce(func: Function, wait: number = 200, immediate?: boolean) {
    let timeout: number | null;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout!);
        timeout = window.setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};