import { VNode } from './vnode';
export function h(nodeName: string, attributes: {}, ...children: Array<VNode | string>) {
    return new VNode(nodeName, attributes, ...children);
}
