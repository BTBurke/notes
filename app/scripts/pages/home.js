'use strict';

var React = require('react'),
    B = require('react-bootstrap'),
    _ = require('underscore'),
    $ = require('jquery'),
    Col = B.Col,
    Row = B.Row,
    Grid = B.Grid,
    Navbar = B.Navbar,
    Nav = B.Nav,
    Input = B.Input,
    Button = B.Button,
    Glyphicon = B.Glyphicon;

var Link = require('react-router').Link;

var Topnav = require('../components/topnav')

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }


  componentDidMount() {

  }

  componentDidUnmount() {

  }

  render() {

    return (
      <div>
      <Topnav />
      <div>
        This is a test.
      </div>
      </div>
    );
  }
}

module.exports = Home;
