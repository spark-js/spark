import { debounce, reverseKebab, SparkElement, SparkElementDefinition } from './common';
import { createStyles } from './styles';
import { render, VNode } from './vdom';


export function CustomElement<props>(name: string) {
    const customElement: SparkElementDefinition<props> = class extends HTMLElement implements SparkElement<props> {
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
            super(...args);
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
    return customElement;
}

