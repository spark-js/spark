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

        //register element
        window.customElements.define(elementName, customElementClass);

        return customElementClass;
    }
}

// import { h, render } from 'preact';


// type Props<T> = {
//     [K in keyof T]: T[K];
// }

// export abstract class CustomComponent<T> extends HTMLElement {

//     public abstract props: Props<T>;
//     private _dom: Element;

//     constructor() {
//         super();
//         if (!this.shadowRoot) {
//             this.attachShadow({ mode: 'open' });
//         }
//     }

//     connectedCallback() {
//         // Sync properties to attributes
//         this._renderTemplate();
//     }

//     disconnectedCallback() {

//     }

//     attributeChangedCallback(attributeName: string, oldValue: any, newValue: any) {

//     }

//     private _renderTemplate() {
//         this._dom = render(this.template(this.props), <any>this.shadowRoot, this._dom);
//     }

//     abstract template(props?: T): JSX.Element;

// }

// export { h } from 'preact';

