import { VNode } from './vnode';
export function h(nodeName: string, attributes: string, ...children: any[]) {
    return new VNode(nodeName, attributes, children);
}
