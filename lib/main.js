const DOMNodeCollection = require("./dom_node_collection");



window.$l = (arg) => {

   switch (typeof arg) {
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
