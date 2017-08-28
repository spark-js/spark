import { kebab, setAttribute, SparkElement, SparkElementDefinition } from './common';

/**
 * When ObserveAttribute is added to a property in a Spark.js element, 
 * any changes made on the attribute (through DOM or setAttribute) are reflected back to the class property
 * 
 * When set to true, then any changes done on the property programmatically are reflected on the attribute
 * 
 * @param reflectToAttribute when true, reflect property changes to its attribute
 */
export function ObserveAttribute(reflectToAttribute: boolean = false): PropertyDecorator {
    return (target: SparkElement<null>, propertyKey: string) => {
        const ctor: SparkElementDefinition = target.constructor as any;
        const observedAttrs = ctor.observedAttributes;
        const observedAttr = kebab(propertyKey);
        observedAttrs.push(observedAttr);
        const observe = new Observe(target, propertyKey, reflectToAttribute);
    }
}

class Observe {
    propertyValue: string = '';
    /**
     * Internal class used to scope values for each property that has `@ObserveAttribute`
     * 
     * @param target SparkElement
     * @param propertyKey property key to observe
     * @param reflectToAttribute boolean to check if property changes to show on the element attribute
     */
    constructor(target: SparkElement<null>, propertyKey: string, reflectToAttribute: boolean) {
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            get: function () {
                return this.propertyValue;
            },
            set: function (value: any) {
                const self: SparkElement<null> = this;
                this.propertyValue = value;
                if (self.__attached) {
                    if (reflectToAttribute) {
                        setAttribute(self, propertyKey, value);
                    }
                    self.__render();
                }
            }
        })
    }
}