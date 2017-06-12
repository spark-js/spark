import { ObservedAttributes } from './common';

export function ObserveAttribute(): PropertyDecorator {
    return (target: Object, propertyKey: string) => {
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
    }
}