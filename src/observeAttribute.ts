import { ObservedAttributes } from './common';

export function ObserveAttribute(reflectToAttribute: boolean = false): PropertyDecorator {
    return (target: { [key: string]: Object }, propertyKey: string) => {
        const ctor: ObservedAttributes = target.constructor as any;
        let observedAttrs = ctor.observedAttributes;
        if (Array.isArray(observedAttrs)) {
            observedAttrs.push(propertyKey);
        } else {
            observedAttrs = [];
            observedAttrs.push(propertyKey);
            Object.defineProperty(
                ctor,
                'observedAttributes',
                {
                    configurable: true,
                    get() { return observedAttrs; }
                }
            );
        }

        if (reflectToAttribute) {
            let propertyValue = '';
            Object.defineProperty(target, propertyKey, {
                configurable: true,
                get: function() {
                    return propertyValue;
                },
                set: function(value: any) {
                    console.log(value, this);
                    propertyValue = value;
                }
            })
        }
    }
}