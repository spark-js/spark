import { HTMLElementConstructor } from './common/types';

export function CustomElement<T extends HTMLElementConstructor>(elementName: string): ClassDecorator {
    return (target: T) => {
        const customElementClass = class extends target {
            /**
             *
             */
            constructor(...args: any[]) {
                super();
                this.attachShadow({ mode: 'open' });
            }
        }

        // register element
        window.customElements.define(elementName, customElementClass);

        return customElementClass;
    }
}
