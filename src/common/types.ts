import { VNode } from '../vdom/vnode';
export type Constructor<T> = new (...args: any[]) => T;
export type HTMLElementConstructor = Constructor<HTMLElement & Renderer & Is>;
export interface Is {
    is: string;
}
export interface Renderer {
    template: VNode
}
export interface ObserveAttributes {
    attrs: string[];
}
