"use strict";

require("core-js");

var a = () => {
  console.log(void 0);
};

var b = new Map();
Promise.resolve(2).then(val => {
  console.log(val);
});