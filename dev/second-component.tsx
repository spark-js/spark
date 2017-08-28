import { CustomElement, h, ObserveAttribute } from 'spark.js';

export interface SecondProps {
    nameAgain: string;

    test: string;
    onMagic?: (data: Event) => void;
}
export class SecondComponent extends CustomElement<SecondProps>('y-component') implements SecondProps {

    @ObserveAttribute(true)
    nameAgain = 'spark';

    @ObserveAttribute()
    test: string;
    private _name: string = 'sparkjs';
    get template() {
        return <div onClick={() => this.doSomething()}>
            this is my second component {this.nameAgain} {this.test}
        </div>
    }

    doSomething() {
        console.log('click from y-component')
        const event = new CustomEvent('magic', {
            bubbles: true,
            detail: 'hola'
        });
        this.dispatchEvent(event);
    }
}

customElements.define(SecondComponent.is, SecondComponent);