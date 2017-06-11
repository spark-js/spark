import { Is } from '../common';
import { HTMLElementConstructor } from '../../lib/common/types';
export class VNode {

    public children: Array<VNode | string>;
    public type: string;
    public attributes: Object | null;

    constructor(node: string | Is, attributes: Object | null, ...children: Array<VNode | string>) {
        this.type = typeof node == 'string' ? node : node.is;
        this.children = children;
    }
}
