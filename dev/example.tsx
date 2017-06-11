import { CustomElement, h } from 'spark';


@CustomElement('y-component')
class SecondComponent extends HTMLElement {
    get template() {
        return <div>
            this is my second component
        </div>;
    }
}


@CustomElement('x-component')
class MyComponent extends HTMLElement {
    name: string = 'Jonathan';

    get template() {
        return <div class='something'>
            {this.name}
            <span>Hello<br /> {this.name}</span>
            <div>
                <SecondComponent />
            </div>
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