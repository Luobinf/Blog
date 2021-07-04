"use strict";

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var a = () => {
  console.log(void 0);
};

var b = new Map();
Promise.resolve(2).then(val => {
  console.log(val);
});