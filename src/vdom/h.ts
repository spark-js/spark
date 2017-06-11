import { VNode } from './vnode';
export function h(nodeName: string, attributes: Object, ...children: Array<VNode | string>) {
    return new VNode(nodeName, attributes, ...children);
}
