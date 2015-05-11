'use strict';

var React = require('react');
var B = require('react-bootstrap');
var AceEditor = require('react-ace');

var brace = require('brace');
require('brace/mode/java')
require('brace/theme/github')



class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "current": undefined,
            "user": undefined,
            "available": [{
                "name": "Bryan Default Short",
                "url": "assets/keymap-burke.json"
            }]
        };
    }
    
    componentDidMount() {
        
    }
    
    render() {
        return (
            <AceEditor
            mode="java"
            theme="github"
            name="test-ace-editor"
            />
        );
    }
}

module.exports = Edit;