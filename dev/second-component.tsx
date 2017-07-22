import { CustomElement, h, ObserveAttribute } from 'spark';

interface SecondProps {
    nameAgain: string;
    onMagic?: (data: Event) => void;
}
export class SecondComponent extends CustomElement<SecondProps>('y-component') implements SecondProps {

    @ObserveAttribute(true)
    nameAgain = 'spark';

    private _name: string = 'sparkjs';
    get template() {
        return <div onClick={() => this.doSomething()}>
            this is my second component {this.nameAgain}
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