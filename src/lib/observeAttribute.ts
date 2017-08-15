import { kebab, setAttribute, SparkElement, SparkElementDefinition } from './common';

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
        const ctor: SparkElementDefinition = target.constructor as any;
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
                const self: SparkElement<null> = this;
                propertyValue = value;
                if (self.__attached) {
                    if (reflectToAttribute) {
                        setAttribute(<HTMLElement>this, propertyKey, value);
                    }
                    self.__render();
                }
            }
        })

    }
}
