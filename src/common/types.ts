import { VNode } from '../vdom/vnode';
export type Constructor<T> = new (...args: any[]) => T;

export interface ICustomElement {
    is: string;
    template: string;
    styles: string;
    observedAttributes: string[]
}
