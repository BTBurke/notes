var React = require('react');
var B = require('react-bootstrap');


class KeyMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Trying keymap...");
    console.log(this.props.keymap);

    if (this.props.keymap == undefined) {
      return (
        <div>
        No Keymap
        </div>
      )
    } else {

      var groups = this.props.keymap.group;

      var allGroups = groups.map(function(group) {

         var items = group.items.map(function(item) {
           return (
              <tr>
              <td className='item-key'>{item.key}</td>
              <td className='item-desc'>{item.string || item.desc}</td>
             </tr>
           );
         });

         return (
          <B.Col lg={4} md={4}>
              <div className="group-header">{group.desc}</div>
              <B.Table condensed>
                <tbody>
                  {items}
                </tbody>
              </B.Table>
          </B.Col>
        );
      });

      var groupsByRow = [];

      for (var i=0; i<allGroups.length; i=i+3) {

        groupsByRow.push(
          <B.Row>
          {allGroups.slice(i,i+3)}
          </B.Row>
       );
      }


      return (
        <B.Grid>
          {groupsByRow}
        </B.Grid>
      );

    }
  }

}

module.exports = KeyMap;
