import { SparkElementDefinition } from '../common';
export class VNode {

    public children: Array<VNode | string>;
    public type: string;
    public properties: {};

    constructor(node: string | SparkElementDefinition, properties: {}, ...children: Array<VNode | string>) {
        this.type = typeof node === 'string' ? node : node.is;
        this.properties = properties || {};
        this.children = children.map(child => child ? child : '');
    }
}
