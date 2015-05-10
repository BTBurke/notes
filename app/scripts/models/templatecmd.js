var Mustache = require('mustache');
var _ = require('underscore');

class TemplateCmd {
  constructor(props) {
    this.type = "template";

    if (props.data.length > 1) {
      this.data = _.rest(props.data);
    } else {
      this.data = [];
    }
    this.template = props.template;

    if (props.prompt.length > 1) {
      this.prompt = _.rest(props.prompt);
    } else {
      this.prompt = [];
    }

    this.musData = {};
    this.currentPrompt = _.first(props.prompt);
    this.currentData = _.first(props.data);
  }

  setData(value) {
    var key = this.currentData;
    this.musData[key] = value;
  }

  isRenderable() {
    return (this.data.length == 0);
  }

  setNextDataCollect() {
    this.currentData = _.first(this.data);
    this.data = _.rest(this.data);
    this.currentPrompt = _.first(this.prompt);
    this.prompt = _.rest(this.prompt);
  }

  renderTemplate() {
    var output = Mustache.render(this.template, this.musData);
    return output;
  }
}

module.exports = TemplateCmd;
