[logo]: https://cdn.rawgit.com/spark-js/spark/master/docs/spark_logo.svg
<p align="center">
<img src="https://cdn.rawgit.com/spark-js/spark/master/docs/spark_logo.svg" height=200 />
</p>

spark.js
=====

A small library that takes the pain out of pure javascript (or typescript) web components.

## Installation
`
npm install -S spark.js
`
## What spark.js does
Spark.js is primarily used to handle template updates and attribute changes, using only javascript/typescript. There are other libraries ([Polymer](https://www.polymer-project.org)), that help you maintain your templates and attributes, but does that only in HTML files. 
<!-- Personally this feels weird and combersome to include Polymer components into an existing web application (Angular or React).  -->

 Spark.js uses `jsx` and decorators to create web components in a very React-like way.

 ## Usage
 Here is the most basic usage of spark.js
 ```jsx
import { CustomElement, h } from 'spark.js';

class MyComponent extends CustomElement('my-component') {
    get template() {
        return <div>Hello!</div>
    }
}

window.customElements.define(MyComponent.is, MyComponent);
 ```

A little more advanced:
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

### Events
Spark.js does not have any kind of special event system, it uses browser built-in utilities, like `CustomEvent`.

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

## API


