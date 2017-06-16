export function debounce(milliseconds = 100): MethodDecorator {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = d(original, milliseconds);
        return descriptor;
    };
}

function d(callback: any, wait: number) {
    let timeout: number;
    let callbackArgs: any;

    const later = () => callback.apply(callbackArgs);

    return function () {
        callbackArgs = arguments
        clearTimeout(timeout)
        timeout = window.setTimeout(later, wait)
    }
}