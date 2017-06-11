import { VNode } from './vnode';
export function render(parent: ShadowRoot, vnode: VNode) {
    console.log(parent, vnode);
    parent.appendChild(diff(vnode))
}

function diff(node: VNode | string) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const element = document.createElement(node.type);
  node.children
    .map(diff)
    .forEach(element.appendChild.bind(element));
  return element;
}
