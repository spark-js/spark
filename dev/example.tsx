import { CustomElement, h } from 'spark';
@CustomElement('x-component')
class MyComponent extends HTMLElement {
    name: string = 'my name';

    get template() {
        return <div class='something'>
            {this.name}
            <span>Hello</span>
        </div>
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

console.log(new MyComponent().template);
