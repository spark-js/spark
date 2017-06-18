import { Is } from '../common';
export class VNode {

    public children: Array<VNode | string>;
    public type: string;
    public attributes: Object;

    constructor(node: string | Is, attributes: Object, ...children: Array<VNode | string>) {
        this.type = typeof node === 'string' ? node : node.is;
        this.attributes = attributes;
        this.children = children.map(child => child ? child : '');
    }
}
