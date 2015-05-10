var React = require('react');
var B=require('react-bootstrap');

class Command extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'value': ''};
  }

  componentDidMount() {
    if (this.props.cmd.type == 'template') {
      console.log("Trying to focus on render...");
      this.refs.cmd.getInputDOMNode().focus();
    }
  }

  componentDidUpdate() {
    if (this.props.cmd.type == 'template') {
      console.log("Trying to focus on update...");
      this.refs.cmd.getInputDOMNode().focus();
    }
  }

  _onSubmit() {
    this.props.changes(this.refs.cmd.getValue());
    this.setState({'value': ''});
  }

  _onChange() {
    this.setState({
      'value': this.refs.cmd.getValue()
    })
  }

  render() {
    if (this.props.cmd.type === 'info') {

      return (
        <div>
          <div className="false-cmdinput"></div>
          <div className="cmd-info">
            <B.Grid fluid={false}>
              <B.Row>
                <B.Col xs={12} md={12} lg={12}>
                  {">>   " + this.props.cmd.string}
                </B.Col>
              </B.Row>
            </B.Grid>
          </div>

        </div>
      );
    } else if (this.props.cmd.type === 'template') {
      return (
        <div>
        <div className="cmd-input">
        <B.Grid fluid={false}>
          <B.Row>
            <B.Col xs={12} md={12} lg={12}>
              <form onSubmit={this._onSubmit.bind(this)}>
                <B.Input
                  type="text"
                  addonBefore={this.props.cmd.currentPrompt}
                  ref="cmd"
                  hasFeedback
                  value={this.state.value}
                  onChange={this._onChange.bind(this)}
                />
              </form>
            </B.Col>
          </B.Row>
        </B.Grid>
        </div>
        <div className="false-cmdinfo"></div>
      </div>
      );
    }

  }
}

module.exports = Command;
