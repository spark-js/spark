import { CustomElement, h } from 'spark';
@CustomElement('x-component')
class MyComponent extends HTMLElement {
    name: string;

    get template() {
        return (
            <div>
                {this.name}
            </div>
        )
    }

    get styles() {
        return `
            :host {
                display: inline-block;
                width: 100px;
                height: 100px;
                background-color: royalblue;
            }
        `
    }

    constructor() {
        super();
    }

}

// tslint:disable-next-line:no-unused-expression
<MyComponent name="" />
