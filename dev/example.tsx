import { CustomElement, Element, h, ObserveAttribute } from 'spark';
@CustomElement('y-component')
class SecondComponent extends Element<{}> {

    get template() {
        return <div>
            this is my second component
        </div>
    }
}

@CustomElement('x-component')
class MyComponent extends Element<{lastname: string}> {

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
                padding: 12px;
                color: white;
                background-color: royalblue;
                border-radius: 4px;
                box-shadow: 3px 2px 10px 2px rgba(0, 0, 0, 0.1);
            }
        `
    }

    constructor() {
        super();
        setTimeout(() => {
            this.name = 'timedout';
        }, 1000)
    }
}