import { setProperties, updateProperties } from '../common';
import { VNode } from './vnode';
export function render(parent: ShadowRoot, vnode: VNode, previous: VNode): VNode {
  return updateElement(parent, vnode, previous);
}

function createNode(node: VNode | string) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const element = document.createElement(node.type);
  setProperties(element, node.properties);
  node.children
    .map(createNode)
    .forEach(element.appendChild.bind(element));
  return element;
}

function changed(node1: VNode | string, node2: VNode | string): boolean {
  return typeof node1 !== typeof node2 ||
    typeof node1 === 'string' && node1 !== node2 ||
    (<VNode>node1).type !== (<VNode>node2).type
}

/**
 * Update custom element template whenever a property changes.
 * @param parent
 * @param newNode
 * @param oldNode
 * @param index Starts at 1 because index 0 is styles
 */
function updateElement(parent: Node, newNode: VNode | string, oldNode: VNode | string, index = 1): VNode {
  if (oldNode == null) {
    parent.appendChild(
      createNode(newNode)
    );
  } else if (newNode == null) {
    parent.removeChild(
      parent.childNodes[index]
    );
  } else if (changed(newNode, oldNode)) {
    parent.replaceChild(
      createNode(newNode),
      parent.childNodes[index]
    );
  } else if ((<VNode>newNode).type) {
    updateProperties(parent.childNodes[index] as HTMLElement, (<VNode>newNode).properties, (<VNode>oldNode).properties);
    const newLength = (<VNode>newNode).children.length;
    const oldLength = (<VNode>oldNode).children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        parent.childNodes[index],
        (<VNode>newNode).children[i],
        (<VNode>oldNode).children[i],
        i
      );
    }
  }
  return <VNode>newNode;
}