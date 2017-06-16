import { createStyles } from './styles';
import { VNode, render } from './vdom';
import { HTMLElementConstructor, reverseKebab, debounce } from './common';

export function CustomElement<T extends HTMLElementConstructor>(elementName: string): ClassDecorator {
    return (target: T) => {
        const CustomElement = class extends target {

            static get is() {
                return elementName;
            }

            private _dom: VNode;
            private _rendering: boolean = false;
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
                this._render();
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
                    this._render();
                }
            }

            _render() {
                if (!this._rendering) {
                    this._rendering = true;
                    this._dom = render(this.shadowRoot!, this.template, this._dom);
                    this._rendering = false;
                }
            }
        }
        window.customElements.define(elementName, CustomElement);
        return CustomElement;
    }
}
