import { createStyles } from './styles';
import { VNode, render } from './vdom';
import { HTMLElementConstructor, reverseKebab, debounce } from './common';

export function CustomElement<T extends HTMLElementConstructor>(elementName: string): ClassDecorator {
    return (target: T) => {
        Object.defineProperty(
            target, 
            'is',
            {
                value: elementName
            }
        )
        window.customElements.define(elementName, target);
    }
}


export class Element<T> extends HTMLElement  {
    properties: Readonly<T>
    public template: VNode | JSX.Element;
    public styles: string;

    private __dom: VNode;
    private __rendering: boolean = false;
    /**
     * Checks to see if the custom element is already attached to the DOM
     */
    private __attached: boolean = false;

    private __render: (immediate?: boolean) => () => void;

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
                this.__dom = render(this.shadowRoot!, this.template as VNode, this.__dom);
                this.__rendering = false;
            }
        }, 50, immediate);
    }

    connectedCallback() {
        this.shadowRoot!.appendChild(createStyles(this.styles));
        this.__render(true)();
        this.__attached = true;
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        // if a property is set on the dom, sync it to the internal property
        if (newValue === oldValue) {
            return;
        }

        (<any>this)[reverseKebab(name)] = newValue;

        if (this.__attached) {
            // Re-render template whenever attributes change
            this.__render()();
        }
    }
}