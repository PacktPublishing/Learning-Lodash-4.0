var BaseInput = require('../../base/input');
var create = require('lodash/object/create');
var forEach = require('lodash/collection/each');
var reduce = require('lodash/collection/reduce');
var escapeRegExp = require('lodash/string/escapeRegExp');
var trim = require('lodash/string/trim');

//
// Constructor for the input filter component
//
function FilterInput(config) {
  BaseInput.call(this, config);
}

//
// Inherit from the BaseInput
//
FilterInput.prototype = create(BaseInput.prototype, {

  constructor: FilterInput,

  events: {
    'input': ['filterItems', '.filter-input-form input']
  }

});

//
// Override the init() method
//
FilterInput.prototype.init = function(config) {
  this.filter = config.filter || '.filter-items';
  return BaseInput.prototype.init.call(this, config);
};

//
// Filter the dom items provided in init() when the input is updated
//
FilterInput.prototype.filterItems = function(ev) {
  var items = document.querySelectorAll(this.filter + ' [data-filter-item]');
  var input = ev.target;
  var text = input && escapeRegExp(trim(input.value));
  forEach(items, this.filterItem.bind(this, text), this);
};

//
// Filter an item by a text string
//
FilterInput.prototype.filterItem = function(text, item) {
  var filterTexts = item.querySelectorAll('[data-filter-text]');
  var allText = reduce(filterTexts, function(current, value) {
    return current += trim(value.textContent || value.innerText);
  }, '');
  var regexp = new RegExp(text);
  item.style.display = allText.match(regexp) ? '' : 'none';
};

module.exports = FilterInput;