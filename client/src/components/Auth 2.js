import React from "react";
import { BrowserRouter, Route, Switch, Redirect, withRouter, Link} from 'react-router-dom';

export default function requireAuth(Component) {

    class AuthenticatedComponent extends React.Component {
  
      componentWillMount() {
        this.checkAuth();
      }
  
      checkAuth() {
        console.log(document.cookie);
        if ( ! document.cookie.uid ) {
          const location = this.props.location;
          const redirect = location.pathname + location.search;
          this.props.router.push(`/login?redirect=${redirect}`);
        }
      }
  
      render() {
        return true

          ? <Component { ...this.props } />
          : null;
      }
  
    }
  
    return withRouter(AuthenticatedComponent);
}