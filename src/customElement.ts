import { createStyles } from './styles';
import { VNode, render } from './vdom';
import { Constructor, debounce, reverseKebab } from './common';


const dom = Symbol('dom')

export function CustomElement<props>(name: string) {
    return class extends HTMLElement {
        [key: string]: any;
        customAttributes: props
        static get is() {
            return name;
        }

        template: VNode;
        styles: string;

        __dom: VNode;
        __rendering: boolean = false;
        __attached: boolean = false;

        __render: (immediate?: boolean) => () => void;

        /**
         *
         */
        constructor(...args: any[]) {
            super();
            if (!this.shadowRoot) {
                this.attachShadow({ mode: 'open' });
            }

            // assign debounce function with arguments to render.
            this.__render = (immediate: boolean) => debounce(() => {
                if (!this.__rendering) {
                    this.__rendering = true;
                    this[dom] = render(this.shadowRoot!, this.template, this[dom]);
                    this.__rendering = false;
                }
            }, 50, immediate);
        }

        connectedCallback() {
            this.shadowRoot!.appendChild(createStyles(this.styles));
            this.__render(true)();
            this.__attached = true;
        }

        attributeChangedCallback(name: keyof props, oldValue: string, newValue: string) {
            // if a property is set on the dom, sync it to the internal property
            if (newValue === oldValue) {
                return;
            }

            this[reverseKebab(name)] = newValue;

            if (this.__attached) {
                // Re-render template whenever attributes change
                this.__render()();
            }
        }
    }

}

