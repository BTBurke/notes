var React = require('react');
var B=require('react-bootstrap');

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'user': "BurkeBT",
    }
  }

  render() {
    return (
      <B.Navbar brand='Notes' toggleNavKey={0}>
        <B.Nav right eventKey={0}> {/* This is the eventKey referenced */}
          <B.DropdownButton eventKey={3} title={this.state.user}>
            <B.MenuItem eventKey='1'>Settings</B.MenuItem>
            <B.MenuItem eventKey='2'>Keymap</B.MenuItem>
          </B.DropdownButton>
        </B.Nav>
  </B.Navbar>
    );
  }
}

module.exports = TopNav;
