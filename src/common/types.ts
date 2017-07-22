import { VNode } from '../vdom';
export type Constructor<T> = new (...args: any[]) => T;

/**
 * Definition of Spark elements
 */
export interface SparkElementDefinition<T = object> {
    /**
     * Name of the custom element
     */
    is: string;
    /**
     * Properties that are decorated with `ObserveAttribute` are placed into this array. This ensures that the browser will 
     * trigger `attributeChangedCallback` whenever those attributes are changed.
     */
    observedAttributes: string[];
    new(): SparkElement<T>
}

/**
 * Instance of Spark elements
 */
export interface SparkElement<props> extends HTMLElement {
    /**
     * VNode that gets rendered into the dom. Uses `h`
     */
    template: VNode;
    /**
     * Styles that are scoped to the element
     */
    styles: string;
    /**
     * Internal. Used for TSX intellisense
     */
    customAttributes: props;
    __dom: VNode;
    __rendering: boolean;
    __attached: boolean;
    __render: (immediate?: boolean) => () => void;

    /**
     * Whenever the element is attached to the dom, `connectedCallback` will be triggered.
     */
    connectedCallback?(): void;
    /**
     * Whenever attributes that are decorated with `ObserveAttribute` are changed on the dom, `attributeChangeCallback`
     * will be triggered.
     * 
     * Make sure to call the super implementation if overriding.
     */
    attributeChangedCallback?(name: string, oldvalue: any, newvalue: any): void
}
