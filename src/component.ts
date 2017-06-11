import { render } from './vdom/render';
import { HTMLElementConstructor } from './common/types';

export function CustomElement<T extends HTMLElementConstructor>(elementName: string): ClassDecorator {
    return (target: T) => {
        const CustomElement = class extends target {

            static get is() {
                return elementName;
            }

            /**
             *
             */
            constructor(...args: any[]) {
                super(...args);
                if (!this.shadowRoot) {
                    this.attachShadow({ mode: 'open' });
                }
            }

            connectedCallback() {
                render(this.shadowRoot!, this.template);
            }
        }
        // register element
        window.customElements.define(elementName, CustomElement);

        return CustomElement;
    }
}
