import { CustomElement, h } from 'spark';

interface secondProps {
    nameAgain: string;
}
export class SecondComponent extends CustomElement<secondProps>('y-component') implements secondProps {
    nameAgain: string = 'something';
    get template() {
        return <div>
            this is my second component
        </div>
    }
}

customElements.define(SecondComponent.is, SecondComponent);