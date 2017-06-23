import { CustomElement, h, ObserveAttribute } from 'spark';
import { SecondComponent } from './second-component';
interface MycomponentProps {
    lastname: string;
    name: string;
    checkedIn: boolean
}


export class MyComponent extends CustomElement<MycomponentProps>('x-component') {

    @ObserveAttribute()
    lastname: string;

    @ObserveAttribute(true)
    name: string;

    @ObserveAttribute(true)
    checkedIn: boolean;

    get template() {
        return <div class='something'>
            {this.name}
            <span onClick={this.doSomething}>Hello<br /> {this.name} {this.lastname}</span>
            <div>
                <SecondComponent nameAgain='1' onMagic={(event) => this.doSomething(event)}/>
                <input onKeyUp={(event) => this.setFirstName(event)} />
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

    doSomething(event: Event | CustomEvent) {
        console.log(event);

        if (event instanceof CustomEvent) {
            this.name = event.detail;
        }
    }

    setFirstName(event: KeyboardEvent) {
        this.name = (event as any).composedPath()[0].value;
    }

}
customElements.define(MyComponent.is, MyComponent);