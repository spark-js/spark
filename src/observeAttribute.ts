import { ObservedAttributes } from './common';

export function ObserveAttribute(reflectToAttribute: boolean = false): PropertyDecorator {
    return (target: { [key: string]: Object }, propertyKey: string) => {
        const ctor: ObservedAttributes = target.constructor as any;
        const observedAttrs = ctor.observedAttributes || [];
        observedAttrs.push(propertyKey);
        Object.defineProperty(
            ctor,
            'observedAttributes',
            {
                configurable: true,
                get() { return observedAttrs; }
            }
        );

        if (reflectToAttribute) {
            let propertyValue = '';
            Object.defineProperty(target, propertyKey, {
                configurable: true,
                get() { 
                    return propertyValue; 
                },
                set(value: any) {
                    console.log(value, this);
                    propertyValue = value;
                }
            })
        }
    }
}