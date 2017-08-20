import { VNode } from './vnode';
import { SparkElementDefinition } from '../common';

/**
 * Function used to create VNodes.
 * 
 * @param node HTML element or spark.js element
 * @param attributes Object of attribute keys and values
 * @param children Array of string or `h`
 */
export function h(node: string | SparkElementDefinition, attributes: {}, ...children: Array<VNode | string>) {
    return new VNode(node, attributes, ...children);
}
