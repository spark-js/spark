import { CustomElement, h, ObserveAttribute } from 'spark';


@CustomElement('y-component')
class SecondComponent extends HTMLElement {

    get template() {
        return <div>
            this is my second component
        </div>
    }
}

@CustomElement('x-component')
class MyComponent extends HTMLElement {

    @ObserveAttribute()
    lastname: string;

    @ObserveAttribute(true)
    name: string;

    @ObserveAttribute(true)
    checkedIn: boolean = false;

    get template() {
        return <div class='something'>
            {this.name}
            <span>Hello<br /> {this.name} {this.lastname}</span>
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
