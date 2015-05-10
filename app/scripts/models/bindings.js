var _ = require('underscore');
var Mousetrap = require('mousetrap');

// Helper functions
var _bindItem = function(item, keyStringFunction, keyTemplateFunction) {
  if (item.string != undefined) {
    console.log("binding", item.key);
    Mousetrap.bind(item.key, keyStringFunction(item.string));
  } else {
    console.log("binding template", item.key);
    Mousetrap.bind(item.key, keyTemplateFunction(item.template))
  }
}

var _bindGroup = function(group, keyStringFunction, keyTemplateFunction) {
  console.log("binding group", group.desc)
  for (var i in group.items) {
    _bindItem(group.items[i], keyStringFunction, keyTemplateFunction);
  }
}

class Bindings {
  constructor(keymap, keyStringFunction, keyTemplateFunction) {
    this.keymap = keymap;
    this.keyStringFunction = keyStringFunction;
    this.keyTemplateFunction = keyTemplateFunction;

  }

  bindAll() {
    for (var i in this.keymap.group) {
        _bindGroup(this.keymap.group[i], this.keyStringFunction, this.keyTemplateFunction);
    }
  }

  unbindAll() {
    Mousetrap.reset();
  }
}


module.exports = Bindings;
