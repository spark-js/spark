import { createStyles } from './styles';
import { VNode, render } from './vdom';
import { Constructor, debounce, ICustomElement, reverseKebab } from './common';

export function CustomElement<props>(name: string) {
    const CustomElement = class extends HTMLElement {
        static readonly observedAttributes: string[] = [];
        static get is() {
            return name;
        }
        customAttributes: props
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
                    this.__dom = render(this.shadowRoot!, this.template, this.__dom);
                    this.__rendering = false;
                }
            }, 50, immediate);
        }

        connectedCallback() {
            this.shadowRoot!.appendChild(createStyles(this.styles));
            this.__render(true)();
            this.__attached = true;
        }

        attributeChangedCallback(attributeName: keyof props, oldValue: string, newValue: string) {
            // if a property is set on the dom, sync it to the internal property
            if (newValue === oldValue) {
                return;
            }

            (this as any)[reverseKebab(attributeName)] = newValue;

            if (this.__attached) {
                // Re-render template whenever attributes change
                this.__render()();
            }
        }
    }
    return CustomElement;
}

