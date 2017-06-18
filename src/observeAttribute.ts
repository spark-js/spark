import { ObservedAttributes } from './common';
import { kebab, setAttribute } from './common/utils';

export function ObserveAttribute(reflectToAttribute: boolean = false): PropertyDecorator {
    return (target: { [key: string]: Object }, propertyKey: string) => {
        const ctor: ObservedAttributes = target.constructor as any;
        let observedAttrs = ctor.observedAttributes;
        const observedAttr = kebab(propertyKey);
        if (Array.isArray(observedAttrs)) {
            observedAttrs.push(observedAttr);
        } else {
            observedAttrs = [];
            observedAttrs.push(observedAttr);
            Object.defineProperty(
                ctor,
                'observedAttributes',
                {
                    configurable: true,
                    get() { return observedAttrs; }
                }
            );
        }


        let propertyValue = '';
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            get: function () {
                return propertyValue;
            },
            set: function (value: any) {
                propertyValue = value;
                if (reflectToAttribute) {
                    setAttribute(<HTMLElement>this, propertyKey, value);
                }
                if ((<any>this)._attached) {
                    (<any>this)._render();
                }
            }
        })

    }
}
