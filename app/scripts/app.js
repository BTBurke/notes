// Pages
var React = require('react'),
    Home = require('./pages/home'),
    Edit = require('./pages/edit');

// React-router
var Router = require('react-router'),
	DefaultRoute = Router.DefaultRoute,
	Route = Router.Route,
	RouteHandler = Router.RouteHandler;


// Public views are rendered under the External component, does
// not require login
var External = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="external" path="/" handler={External}>
    <DefaultRoute handler={Home}/>
    <Route name="edit" handler={Edit} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById("app"));
});
