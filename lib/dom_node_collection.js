class DOMNodeCollection {
  constructor(arr) {
    //save as an instance variable to be used throughout entire function//
  this.elements = arr;
  }

  html(string) {
    if (typeof string === "string") {
      this.elements.forEach(el => {
        el.innerHTML = string;
      });
    }
    else {
      return this.elements[0].innerHTML;
    }
  }

  empty() {
    this.elements.innerHTML = "";
  }


  append(collection) {

    if (typeof collection === "string") {
      this.elements.forEach((el) => {
        el.innerHTML += collection;
      });
    } else if (collection instanceof DOMNodeCollection) {

      this.elements.forEach((el) => {
        collection.elements.forEach((collectionEl) => {
          el.innerHTML += collectionEl.outerHTML;
        });
      });
    }
  }

  attr(name, value) {
    if (value && typeof value === "string") {
      this.elements.forEach(el => {
        el.setAttribute(name, value);
      });
    } else if (value && typeof value !== "string") {
      value = value.toString();
      this.elements.forEach(el => {
        el.setAttribute(name, value);
      });
    }

    if (!value) {
      return this.elements[0].getAttribute(name);
    }
  }

  addClass(name) {
    this.elements.forEach(el => {
      el.classList.add(name);
    });
  }

  removeClass(name) {
    this.elements.forEach(el => {
      el.classList.remove(name);
    });
  }

  children() {
    let childElements = [];
    this.elements.forEach(el => {
      childElements = childElements.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(childElements);
  }

  parent() {
    let parentElements = [];
    this.elements.forEach(el => {
      if (!parentElements.includes(el.parentNode)){
      parentElements = parentElements.concat([el.parentNode]);
    }});
    return new DOMNodeCollection(parentElements);
  }

  find(element) {
    let foundElements = [];
    this.elements.forEach(el => {
      foundElements = foundElements.concat(Array.from(el.querySelectorAll(element)));
    });
    return new DOMNodeCollection(foundElements);
  }

  remove() {
    this.elements.forEach(el => {
      el.parentNode.removeChild(el);
    });
  }

  


}


module.exports = DOMNodeCollection;
