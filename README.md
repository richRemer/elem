Create DOM elements using CSS selector-like syntax.

Example
=======
```js
import {elem} from "https://unpkg.com/@esfn/elem@0.1.0/elem.js";

function makeHiddenDiv(id) {
    return elem(`div.hide#${id}`);
}
```
