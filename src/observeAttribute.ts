import { ICustomElement } from './common';
import { kebab, setProperty } from './common/utils';

/**
 * When ObserveAttribute is added to a property in a custom element, 
 * any changes made on the attribute (through DOM or setAttribute) are reflected back to the class property
 * 
 * When set to true, then any changes done on the property programmatically are reflected on the attribute
 * 
 * @param reflectToAttribute when true, reflect property changes to its attribute
 */
export function ObserveAttribute(reflectToAttribute: boolean = false): PropertyDecorator {
    return (target: { [key: string]: Object }, propertyKey: string) => {
        const ctor: ICustomElement = target.constructor as any;
        const observedAttrs = ctor.observedAttributes;
        const observedAttr = kebab(propertyKey);
        observedAttrs.push(observedAttr);
        
        let propertyValue = '';
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            get: function () {
                return propertyValue;
            },
            set: function (value: any) {
                propertyValue = value;
                if (reflectToAttribute) {
                    setProperty(<HTMLElement>this, propertyKey, value);
                }
                if ((<any>this)._attached) {
                    (<any>this)._render();
                }
            }
        })

    }
}
