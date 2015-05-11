'use strict';

var React = require('react');
var reqwest = require('reqwest');
var Mousetrap = require('mousetrap');
var _ = require('underscore');


var TopNav = require('../components/topnav');
var CommentsBox = require('../components/commentsbox');
var Command = require('../components/command');
var KeyMap = require('../components/keymap');

var InfoCmd = require('../models/infocmd');
var TemplateCmd = require('../models/templatecmd');
var Bindings = require('../models/bindings');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.bindings = undefined;
    this.state = {
      "keymap": undefined,
      "comment": [],
      "cmd": new InfoCmd('')
    };
  }

  // Before render get the default keymap and load it
  // TODO: Allow user to request personalized keymap, move this
  // to external function to be called when keymap changes
  componentWillMount() {
    var updateKeymap = function(keymap, name) {
      this.setState({
        "keymap": keymap,
        "cmd": new InfoCmd("Loaded " +  name)
      });

      if (this.bindings != undefined) {
        this.bindings.unbindAll();
      }
      this.bindings = new Bindings(keymap, this.handleKeyString.bind(this), this.handleKeyTemplate.bind(this));
      this.bindings.bindAll();

      // Clear everything on ctrl+x
      Mousetrap.bind("ctrl+x", this.clearComment.bind(this));
      // TODO: maybe allow ctrl-z undo to work inside the input field
      // since you need to click out of any Template data prompt before
      // undo will take effect
      Mousetrap.bind("ctrl+z", this.undoOrAbort.bind(this));

    }.bind(this);

    reqwest({
      url: 'assets/default.json',
      type: 'json',
      contentType: 'application/json',
    }).then(function(resp) {
      console.log("resp", resp);
      updateKeymap(resp, "default keymap");
    });
  }

  // On render add bindings from the keymap and set up global actions
  // for clear and undo
  componentDidMount() {

  }

  // On page change, remove bindings so we don't throw lots of errors
  componentWillUnmount() {
    this.bindings.unbindAll();
    Mousetrap.reset();
  }

  // clearComment prepares for a new round of comments by clearing
  clearComment() {
    console.log("reset...");
    this.setState({
      "comment": [],
      "cmd": new InfoCmd("Cleared")
    });
  }

  // undoOrAbort will abort any templating command in mid-sequence
  // or if the last cmd was info, then it will pop the last comment
  // off the stack
  undoOrAbort() {
    console.log("Undo or abort...");
    var len = this.state.comment.length;
    if (len == 1) {
      var newComment = [];
    } else {
      var newComment = _.first(this.state.comment, len-2);
    }
    this.setState(
      {
        "comment": newComment,
        "cmd": new InfoCmd("Undo")
      }
    );
    console.log(this.state);
  }

  // handleKeyString is a factory function for updating the comments for
  // key bindings that directly return a string
  handleKeyString(comment) {
    var returnFunc = function() {
      var newComments = _.reject(this.state.comment.concat(comment), function(com){com.length==0});
      this.setState({
        "comment": newComments,
        "cmd": new InfoCmd(comment),
      });
    }
    return returnFunc.bind(this);
  }

  // handleKeyTemplate is a factory function for setting in motion a template
  // flow that results in rendering a dynamic comment
  handleKeyTemplate(template) {
    var returnFunc = function() {
      this.setState(
        {
          "cmd": new TemplateCmd(template)
        }
      );
    }
    return returnFunc.bind(this);
  }

  // handleCommentChange is a callback used when manually changing the comment
  // in the text box. ", " is used a delimiter between comments to convert any
  // changes back into an array of comments
  handleCommentChange(value) {
    var newValue = _.reject(value.split(", "), function(com){ com.length == 0 });

    this.setState({
      "comment": newValue
    })
    console.log("New State: ", this.state);
  }

  // handleCommentSubmit is a callback invoked when a data point is entered
  // for a template.  If no more data is needed (isRenderable = true), then
  // the Mustache template is rendered and added to the comment.  Otherwise,
  // the next required data point is set for prompting.
  handleCommandSubmit(value) {
    this.state.cmd.setData(value);

    if (this.state.cmd.isRenderable()) {
      var output = this.state.cmd.renderTemplate();
      var newComments = _.reject(this.state.comment.concat(output), function(com){com.length ==0});
      this.setState({
        "comment": newComments,
        "cmd": new InfoCmd(output),
      });

    } else {
      this.state.cmd.setNextDataCollect();
      this.setState({"cmd": this.state.cmd});
    }
  }

  // Render
  render() {
    console.log(this.state)
    return (
      <div>
        <TopNav />
        <CommentsBox
          changes={this.handleCommentChange.bind(this)}
          comment={this.state.comment.join(', ')}
        />
      <KeyMap keymap={this.state.keymap} />
        <Command
          cmd={this.state.cmd}
          changes={this.handleCommandSubmit.bind(this)}
        />
      </div>
    );
  }
}

module.exports = Home;
