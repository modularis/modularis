// Example usage:
// import leftPad from 'left-pad';
// let foo = leftPad('bar', 2);

// Goals:
// - initial server side rendering
// - easy modifying / ajaxing / eventing
// 
// - create a template
// - use the template for manipulating data
// - nested data ???????
// - be inteligent about values and props
// - fetch a template from html ajax call (lazy loading content)

// @TODO: value (change name) should be object with value and props

class Component {
  constructor(selector) {
    this.$component = document.querySelector(selector);
  }

  // get $elements() {
  //   return this.$component.querySelectorAll('[fjs-element]');
  // }

  get elements() {
    const elements = {};
    this.scanElements(elements);
    return elements;
    // return Array.from(this.$elements).reduce((elementObject, $element) => {
    //   let elementName = $element.getAttribute('fjs-element');
    //   if (elementName.match(/\[/)) {
    //     elementName = elementName.replace(/\[\]/, '');
    //     elementObject[elementName] = elementObject[elementName] || [];
    //     elementObject[elementName].push($element);
    //   } else {
    //     elementObject[elementName] = $element;
    //   }
    //   return elementObject;
    // }, {});
  }

  get data() {
    return Array.from(this.$elements).reduce((elementObject, $element) => {
      let elementName = $element.getAttribute('fjs-element');
      if (elementName.match(/\[\]/)) {
        elementName = elementName.replace(/\[\]/, '');
        elementObject[elementName] = elementObject[elementName] || [];
        elementObject[elementName].push($element.innerText);
      } else {
        elementObject[elementName] = $element.innerText;
      }
      return elementObject;
    }, {});
  }

  set data(data) {
    for (let elementName in data) {
      if (typeof data[elementName] === 'object') {
        const template = this.elements[elementName][0];
        const parentNode = template.parentNode;
        while (parentNode.firstChild) {
          parentNode.removeChild(parentNode.firstChild);
        }
        for (let k in data[elementName]) {
          const value = data[elementName][k];
          const newNode = template.cloneNode();
          newNode.innerText = value;
          parentNode.appendChild(newNode);
        }
      } else {
        this.elements[elementName].innerText = data[elementName];
      }
    }
  }

  scanElements(elements = {}, $parentNode = this.$component, nestedStore = null) {
    const $childNodes = $parentNode.children;
    const store = nestedStore || elements;
    Array.from($childNodes).forEach(($childNode) => {
      let elementName = $childNode.getAttribute('fjs-element');
      if (elementName.length) {
        if (elementName.match(/\[/)) {
          elementName = elementName.replace(/\[\]/, '');
          store[elementName] = store[elementName] || [];
          store[elementName].push($childNode);
        } else {
          store[elementName] = $childNode;
        }
      }
      const $grandChildren = $childNode.children;
      if ($grandChildren) {
        store['test'] = {};
        this.scanElements(elements, $childNode, store['test']);
      }
    });
  }
}

class Counter extends Component {
}

class List extends Component {
  constructor(selector) {
    super.constructor(selector);
    // window.setInterval(() => {
    //   const newElements = [ 'New Item' ];
    //   this.data = { items: this.data.items.concat(newElements) };
    // }, 2000);
  }
}

class ContentList extends Component {
}

class HandlebarsGenerator {
  constructor($template) {
    this.$template = $template.cloneNode(true);
  }

  get hbl() {
    const $repeat = this.$template.querySelectorAll('[fjs-repeat]');
    for (let k in $repeat) {
      console.log($repeat);
      // const $node = $repeat[k];
      // while ($node.childNodes.length > 1) {
      //   $node.removeChild($node.lastChild);
      // }
    }
    return this.$template;
  }
}

const generator = new HandlebarsGenerator(document.querySelector('[fjs-component="ContentList"]'));
console.log(generator.hbl);

// const counter = new ContentList('[fjs-component="ContentList"]');
// console.log(counter);

// const counter = new Counter('[fjs-component="Counter"]');
// const list = new List('[fjs-component="List"]');
// console.time('counter data');
// counter.data = {
//   down: 'Hallo',
//   number: 300,
//   up: 'Welt'
// };
// 
// list.data = {
//   items: [
//     'Hallo',
//     'Welt',
//     'Testor'
//   ]
// };
// console.timeEnd('counter data');
// 
// console.log(counter);
// console.log(list);

function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}
