import { VNode } from '../vdom';

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

/**
 * Used to set attributes on the given element.
 * 
 * @param element HTMLElement to set attribute on
 * @param propertyKey name of the attribute
 * @param value value of the attribute
 */
export function setAttribute(element: HTMLElement, propertyKey: string, value: any) {
    const attrName = kebab(propertyKey);
    if (typeof value === 'boolean') {
        element.setAttribute(attrName, '' + value);
        return;
    }

    if (value) {
        element.setAttribute(attrName, value);
    } else {
        element.removeAttribute(attrName);
    }
}

export function setProperties(element: HTMLElement, attributes: { [key: string]: string }) {
    Object.keys(attributes).forEach(key => {
        if (isEventProp(key)) {
            setEventListener(element, key, attributes[key]);
        } else {
            setAttribute(element, key, attributes[key]);
        }
    });
}

export function updateProperties(element: HTMLElement, newProps: { [key: string]: string }, oldProps: { [key: string]: string } = {}) {
    const props = { ...newProps, ...oldProps };
    Object.keys(props).forEach(key => {
        if (!isEventProp(key)) {
            setAttribute(element, key, props[key]);
        }
    });
}

export function isEventProp(name: string) {
    return /^on/.test(name);
}

export function extractEventName(name: string) {
    return name.slice(2).toLowerCase();
}

export function setEventListener(element: HTMLElement, name: string, event: any) {
    element.addEventListener(
        extractEventName(name),
        (event)
    );
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

/**
 * Flattens an array to be single nested
 * @param array 
 */
export function flatten(array: Array<string | VNode>): Array<string | VNode> {
    return array.reduce((acc: Array<VNode | string>, curr) => {
        curr = curr || '';
        return [...acc, ...(Array.isArray(curr) ? flatten(curr) : [curr])]
    }, []);
}