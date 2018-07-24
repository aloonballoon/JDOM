const DOMNodeCollection = require("./dom_node_collection");


window.$l = (arg) => {

   switch (typeof arg) {
     case "function":
        return documentReadyFunctions(arg);
     case "object":
        const htmlEl = Array.from(arg);
        return new DOMNodeCollection(htmlEl);
      case "string":
        const nodeList = document.querySelectorAll(arg);
        const nodeArr = Array.from(nodeList);
        return new DOMNodeCollection(nodeArr);
     default:
        return console.log("hi");
   }



};

let docReady;

if (document.readyState === 'complete') {
  docReady = true;
} else {
  docReady = false;
}

const documentReadyFunctions = (func) => {
  let functions = [];
  functions.push(func);
  if (docReady) {
    functions.forEach(el => {
      el();
    });
  }
};
