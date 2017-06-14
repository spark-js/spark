import { createStyles } from './styles';
import { VNode, render } from './vdom';
import { HTMLElementConstructor } from './common/types';
import { reverseKebab } from './common/utils';

export function CustomElement<T extends HTMLElementConstructor>(elementName: string): ClassDecorator {
    return (target: T) => {
        const CustomElement = class extends target {

            static get is() {
                return elementName;
            }

            private _dom: VNode;
            /**
             * Checks to see if the custom element is already attached to the DOM
             */
            private _attached: boolean = false;

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
                this.shadowRoot!.appendChild(createStyles(this.styles));
                this._dom = render(this.shadowRoot!, this.template, this._dom);
                this._attached = true;
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {
                // if a property is set on the dom, sync it to the internal property
                if (newValue === oldValue) {
                    return;
                }

                (<any>this)[reverseKebab(name)] = newValue;

                if (this._attached) {
                    // Re-render template whenever attributes change
                    this._dom = render(this.shadowRoot!, this.template, this._dom);
                }
            }
        }
        window.customElements.define(elementName, CustomElement);
        return CustomElement;
    }
}
