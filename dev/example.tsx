import { CustomElement, h, ObserveAttribute } from 'spark';


@CustomElement()
class SecondComponent extends HTMLElement {

    static get is() {
        return 'y-component';
    }

    get template() {
        return <div>
            this is my second component
        </div>
    }
}
customElements.define(SecondComponent.is, SecondComponent);


@CustomElement()
class MyComponent extends HTMLElement {

    static get is() {
        return 'x-component'
    }

    @ObserveAttribute(true)
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
        setTimeout(() => {
            this.name = 'timedout';
        })
    }

}
customElements.define(MyComponent.is, MyComponent);