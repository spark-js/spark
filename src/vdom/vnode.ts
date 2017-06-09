export class VNode {

    public children: string[];
    constructor(public nodeName: string, public attributes: string, ...children: any[]) {
        this.children = children;
    }
}
