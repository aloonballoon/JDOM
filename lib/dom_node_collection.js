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

  attr(element) {
    return element.attributes;
  }


}


module.exports = DOMNodeCollection;
