import { VNode } from '../vdom/vnode';
export type Constructor<T> = new (...args: any[]) => T;
export type HTMLElementConstructor = Constructor<HTMLElement & Renderer & Is & ObservedAttributes>;
export interface Is {
    is: string;
}
export interface Renderer {
    template: VNode
    styles: string;
}
export interface ObservedAttributes {
    observedAttributes: string[];
}

