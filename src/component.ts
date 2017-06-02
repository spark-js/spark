import { h, render } from 'preact';

export abstract class CustomComponent extends HTMLElement {

    private __dom: Element;

    constructor() {
        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {
        // Sync properties to attributes
    }

    disconnectedCallback() {

    }

    attributeChangedCallback(attributeName: string, oldValue: any, newValue: any) {

    }

    private __propsChanged() {
        this.__dom = render(this.template(), <any>this.shadowRoot, this.__dom);
    }

    abstract template(): JSX.Element;

}

export { h } from 'preact';

