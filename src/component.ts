import { createStyles } from './styles';
import { VNode, render } from './vdom';
import { HTMLElementConstructor } from './common/types';

export function CustomElement<T extends HTMLElementConstructor>(elementName?: string): ClassDecorator {
    return (target: T) => {
        return class extends target {
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
                // TODO (cammisuli): have a system to sync properties
                // if a property is set on the dom, sync it to the internal property
                (<any>this)[name] = newValue;
                if (this._attached) {
                    // Re-render template whenever attributes change
                    this._dom = render(this.shadowRoot!, this.template, this._dom);
                }
            }
        }
    }
}
