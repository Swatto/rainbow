;(function(){
  'use strict';

  var elements = document.querySelectorAll('.rainbow');
  for (var i = elements.length - 1; i >= 0; i--) {
    Rainbow(elements[i], {
      saturation: elements[i].getAttribute('data-saturation'),
      lightness: elements[i].getAttribute('data-lightness')
    });
  };

  function Rainbow(el, options){

    if(!el && typeof el !== 'object'){
      throw new Error('Provide a element to Rainbow');
    }

    var saturation = '100%',
        lightness = '50%',
        futurElems = [],
        letters = el.innerText.split('');

    if(options){
      if(options.saturation && typeof options.saturation == 'string'){
        saturation = options.saturation;
      }else if(el.hasAttribute('data-saturation')){
        saturation = el.getAttribute('data-saturation');
      }
      if(options.lightness && typeof options.lightness == 'string'){
        lightness = options.lightness;
      }else if(el.hasAttribute('data-lightness')){
        lightness = el.getAttribute('data-lightness');
      }
    }

    el.innerHTML = '<span></span>';
    for (var i = 0; i < letters.length; i++) {
      var tempElem = document.createElement('span');
      var color;
      if(i == 0){
        color =  0;
      }else if(i == letters.length -1 ){
        color =  255
      }else{
        color = 256 / letters.length * (i+1);
      }
      tempElem.innerText = letters[i];
      tempElem.style.color = 'hsl('+color+','+saturation+', '+lightness+')';
      var spans = el.querySelectorAll('span');
      el.insertBefore(tempElem, spans[spans.length -1]);
    };
  };

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  /** Used as a reference to the global object */
  var root = (objectTypes[typeof window] && window) || this;

  /** Detect free variable `exports` */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module` */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports` */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;


  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // define as an anonymous module so, through path mapping
    define(function() {
      return Rainbow;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = Rainbow).Rainbow = Rainbow;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports.Rainbow = Rainbow;
    }
  }
  else {
    // in a browser or Rhino
    root.Rainbow = Rainbow;
  }

}.call(this));
