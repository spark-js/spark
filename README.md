[logo]: https://cdn.rawgit.com/spark-js/spark/master/docs/spark_logo.svg
<p align="center">
<img src="https://cdn.rawgit.com/spark-js/spark/master/docs/spark_logo.svg" height=200 />
</p>

spark.js
=====

A small library that takes the pain out of pure javascript (or typescript) web components.

## What spark.js does
Spark.js is primarily used to handle template updates and attribute changes, using only javascript/typescript. There are other libraries ([Polymer](https://www.polymer-project.org)), that help you maintain your templates and attributes, but does that only in HTML files. 

 Spark.js uses `jsx` and decorators to create web components in a very React-like way.

 ## Code Sample
 ```jsx
import { CustomElement, h } from 'spark.js';

class MyComponent extends CustomElement('my-component') {
    get template() {
        return <div>Hello!</div>
    }
}

window.customElements.define(MyComponent.is, MyComponent);
 ```

Advanced:
```jsx
import { CustomElement, h, ObserveAttribute } from 'spark.js';

interface PersonProps {
    age: number;
}
class Person extends CustomElement<PersonProps>('person-comp') {
    
    @ObserveAttribute()
    age: number;

    get template() {
        return <div>I am {this.age}</div>
    }
}
window.customElements.define(Person.is, Person);

class Place extends CustomElement('place-comp') {
    get template() {
        return <Person age={2}>
    }

    get styles() {
        return `
            :host {
                background-color: royalblue;
            }
        `
    }
}
window.customElements.define(Place.is, Place);

```

## Getting Started
### Installation
`
npm install -S spark.js
`

### Configuration
The bare minimum `tsconfig.json`. 
```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "jsx": "react",
    "jsxFactory": "h",
    "moduleResolution": "node",
    "lib": [
      "es2015",
      "dom"
    ],
    "experimentalDecorators": true
  }
}
```

Here's a default `webpack.config.js` that you can use to get started.
```javascript
module.exports = {
    entry: './spark-component.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: 'spark-component.js',
        path: __dirname
    }
};
```

## Events
Spark.js does not have any kind of special event system. You can use whatever kind of event system you want that work with Web Components. 

There are few things to note when using spark.js components with events within each other:

* Events must start with `on` and are optional in the component props. eg. `onCelebrate`
* When dispatching an event, the event name must be what comes after `on`.
```jsx
import { CustomElement, h, ObserveAttribute } from 'spark.js';

interface PersonProps {
    onCelebrate?: (data: CustomEvent) => void;
}
class Person extends CustomElement<PersonProps>('person-comp') {

    get template() {
        return <div onClick={this.onClick}>Celebrate!</div>
    }

    onClick(event) {
        this.dispatchEvent(new CustomEvent('celebrate', {
            bubbles: true,
            detail: 'Celebrate!'
        }););
    }
}
window.customElements.define(Person.is, Person);

class Place extends CustomElement('place-comp') {
    get template() {
        return <Person onCelebrate={(event) => this.celebrate(event)}>
    }

    celebrate(event: CustomEvent) {
        console.log(event.detail);
    }

}
window.customElements.define(Place.is, Place);
```

## Top level APIs

### `CustomElement`
The base class that all spark.js component inherit from. Takes 1 argument for the name of the component.
  
This sets static properties for better component management:
* `is` returns the name of the web component.
* `observedAttributes` returns all properties with `@ObserveAttribute` on them. This is the same static property as standard Web Components.
  
Components can override the `template` and `style` property.
* `template` must return `VNode`.
* `styles` must return a string.

```jsx
class MyComponent extends CustomElement<props>('my-component') {

    get template() {
        return <div>Hi</div>
    }

    get styles() {
        `
        :host {
            background-color: royalblue;
        }
        `
    }
}

customElements.define(MyComponent.is, MyComponent)
```


### `ObserveAttribute`
When ObserveAttribute is added to a property in a spark.js component, 
any changes made on the attribute (through DOM or setAttribute) are reflected back to the class property
 
When set to true, then any changes done on the property programmatically (eg. `querySelector('my-comp').property = 'test'`) are reflected on the attribute

Whenever an property or attribute changes with `ObserveAttribute`, spark.js will update the DOM automatically. 
 
### `h`
Function used to create a `VNode`

```jsx
...
get template() {
    return h('div', { disabled: false }, ['hello'])
}
...
```

If using Typescript you can specify to use `h` in `jsxFactory`. 
```
{
  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "jsx": "react",
    "jsxFactory": "h",
    "moduleResolution": "node",
    "lib": [
      "es2015",
      "dom"
    ],
    "experimentalDecorators": true
  }
}
```

Follow this [guide](https://babeljs.io/docs/plugins/transform-react-jsx/) to set up `h` with Babel. 

If using `.babelrc ` use the following:
```
{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "h" // default pragma is React.createElement
    }]
  ]
}
```

For individual files, use `/** @jsx dom */`

After configuring your transpiler of choice, you can then just use `jsx` to create `h` functions.


## Life cycle
Since spark.js is just a helper library for Web Components, all the standard Web Component library events happen automatically. 

For each of the below life cycles, you must call `super()` when providing your own functionality. This ensures that spark.js functionality get called whenever you provide your own functions.
| Callback | Description |
|--|--|--|--|
| connectedCallback() | Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. Generally, you should try to delay work until this time.|
| disconnectedCallback() |	Called every time the element is removed from the DOM. Useful for running clean up code (removing event listeners, etc.).
| attributeChangedCallback(attrName, oldVal, newVal) |	An attribute was added, removed, updated, or replaced. Also called for initial values when an element is created by the parser, or upgraded. Note: only attributes listed in the observedAttributes property will receive this callback. |
| adoptedCallback() |	The custom element has been moved into a new document (e.g. someone called document.adoptNode(el)).|