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

  append() {
    
  }


}


module.exports = DOMNodeCollection;
