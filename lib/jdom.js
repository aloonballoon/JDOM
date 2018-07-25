/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

  on(action, cb) {
    this.elements.forEach(el => {
      el.addEventListener(action, cb);
    });
  }

  off(action, cb) {
    this.elements.forEach(el => {
      el.removeEventListener(action, cb);
    });
  }


}


module.exports = DOMNodeCollection;


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ "./lib/dom_node_collection.js");


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


/***/ })

/******/ });
//# sourceMappingURL=jdom.js.map