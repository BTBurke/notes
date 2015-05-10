var React = require('react');
var B=require('react-bootstrap');
var Mousetrap = require('mousetrap');

class CommentsBox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var focusInput = function() {
      this.refs.comment.getInputDOMNode().focus();
    }.bind(this);

    var blurInput = function() {
      console.log("trying to blur...");
      this.refs.comment.getInputDOMNode().blur();
    }.bind(this);

    var getCommentBox = function() {
      console.log("getting comments...");
      return this.refs.comment.getValue();
    }.bind(this);

    var selectAll = function() {
      console.log("selecting all...");
      this.refs.comment.getInputDOMNode().select();
    }.bind(this);

    // Allow 'esc' to work inside input fields
    Mousetrap.prototype.stopCallback = function(e, element, combo) {
        // if the element has the class "mousetrap" then no need to stop
        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
            return false;
        }
        if (combo == 'esc') {
          return false;
        }
        // stop for input, select, and textarea
        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || (element.contentEditable && element.contentEditable == 'true');
    }
    Mousetrap.bind('i', focusInput);
    Mousetrap.bind('esc', blurInput);
    Mousetrap.bind('ctrl+c', selectAll);
  }

  componentWillUnmount() {
    Mousetrap.reset();
  }

  _handleChange() {
    console.log("Im changing comments...");
    this.props.changes(this.refs.comment.getValue())
  }

  render() {
    return (
        <B.Grid fluid={false}>
          <B.Row>
            <B.Col xs={12} md={8} mdOffset={2} lg={8} lgOffset={2}>
              <form>
                <B.Input
                  type='textarea'
                  value={this.props.comment}
                  ref="comment"
                  hasFeedback
                  onChange={this._handleChange.bind(this)}
                  />
              </form>
            </B.Col>
          </B.Row>
        </B.Grid>
    );
  }
}

module.exports = CommentsBox;
