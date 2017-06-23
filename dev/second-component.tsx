import { CustomElement, h } from 'spark';

interface SecondProps {
    nameAgain: string;
    onMagic?: (data: Event) => void;
}
export class SecondComponent extends CustomElement<SecondProps>('y-component') implements SecondProps {
    nameAgain: string = 'something';
    get template() {
        return <div onClick={() => this.doSomething()}>
            this is my second component
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