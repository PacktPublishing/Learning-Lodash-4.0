var BaseComponent = require('../../base');
var create = require('lodash/object/create');
var forEach = require('lodash/collection/each');
var reduce = require('lodash/collection/reduce');

//
// Constructor for the input filter component
//
function FilterInput(config) {
  BaseComponent.call(this, config);
}

//
// Inherit from the BaseComponent
//
FilterInput.prototype = create(BaseComponent.prototype, {
  constructor: FilterInput
});

//
// Override the init() method
//
FilterInput.prototype.init = function(config) {
  this.filter = config.filter || '.filter-items';
  this.el.addEventListener('input', this.filterItems.bind(this), false);
};

//
// Filter the dom items provided in init() when the input is updated
//
FilterInput.prototype.filterItems = function(ev) {
  var items = document.querySelectorAll(this.filter + ' [data-filter-item]');
  var input = ev.target;
  var text = input && input.value.trim();
  forEach(items, this.filterItem.bind(this, text), this);
};

//
// Filter an item by a text string
//
FilterInput.prototype.filterItem = function(text, item) {
  var filterTexts = item.querySelectorAll('[data-filter-text]');
  var allText = reduce(filterTexts, function(current, value) {
    return current += (value.textContent || value.innerText).trim();
  }, '');
  var regexp = new RegExp(text);
  item.style.display = allText.match(regexp) ? '' : 'none';
};

//
// Override the getTemplate() method
//
FilterInput.prototype.getTemplate = function() {
  return require('./template.html');
};

//
// Override the render() method
//
FilterInput.prototype.render = function(data) {
  this.el.innerHTML = this.template(data);
};

module.exports = FilterInput;