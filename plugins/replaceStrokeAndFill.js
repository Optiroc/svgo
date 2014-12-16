'use strict';

exports.type = 'perItem';

exports.active = false;

exports.params = {
  stroke: true,
  fill: true,
  image: true
};

var regStrokeProps = /^stroke/,
regFillProps = /^fill/;

/**
* Replace stroke and fill attrs with classes "s" and "f".
*
* @param {Object} item current iteration item
* @param {Object} params plugin params
* @return {Boolean} if false, item will be filtered out
*
* @author dlz
*/
exports.fn = function(item, params) {
  if (item.isElem()) {

    // remove image elements
    if (params.image && item.isElem('image')) {
      return false;
    }

    // remove gradient elements
    if (params.fill && (item.isElem('linearGradient') || item.isElem('radialGradient'))) {
      return false;
    }

    // replace fill
    if (params.fill && !item.isElem('svg') && !item.hasAttr('fill', 'none')) {
      item.eachAttr(function(attr) {
        if (regFillProps.test(attr.name)) { item.removeAttr(attr.name); }
      });
      item.addClass('f');
    }

    // replace stroke
    if (params.stroke && item.hasAttr('stroke')) {
      item.eachAttr(function(attr) {
        if (regStrokeProps.test(attr.name)) { item.removeAttr(attr.name); }
      });
      item.addClass('s');
    }

  }
};
