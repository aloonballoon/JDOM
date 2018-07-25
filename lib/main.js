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


//merge objects together

$l.extend = (initialObj, ...otherObj) => {
  otherObj.forEach(obj => {
    for (const property in obj) {
      initialObj[property] = obj[property];
    }
    return initialObj;
  });
};

$l.ajax = (options) => {

  const defaults = {
    success: () => {},
    error: () => {},
    url: "",
    method: "GET",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'};

  let ajaxObj = $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();

  xhr.open(ajaxObj.method, ajaxObj.url, true);
  xhr.onload = defaults.success;
  xhr.send(defaults.data);
};

let docReady = false;

//callbacks for when document is ready
const documentReadyFunctions = (func) => {
  //store functions until document is ready then invoke all of them
  let functions = [];
  functions.push(func);
  if (docReady) {
    functions.forEach(el => {
      if (el) {
        el();
      }
    });
  }
};

//checks if document is ready
document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  documentReadyFunctions();
});
