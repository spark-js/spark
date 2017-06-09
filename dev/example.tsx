import { CustomElement } from 'spark';
@CustomElement('x-component')
class MyComponent extends HTMLElement {
    name: string;

    get template() {
        // return (
        //     <div>
        //         {this.name}
        //     </div>
        // )
        return '';
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
