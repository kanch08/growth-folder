import React from "react";
import { get } from "lodash";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Login from "./container/Login";
import Home from "./Home";
import { getLocalstorage, removeItemFromLocalStorage } from "./helper";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = !!getLocalstorage("userInfo");
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const withHistoryProps = ({ history }) => {
  axios.interceptors.response.use(
    response => {
      if (parseInt(get(response, "data.Code"), 10) === 403) {
        removeItemFromLocalStorage("userInfo");
        history.push("/login");
        return null;
      }

      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return (
    <Switch>
      <Route path="/login" component={Login} exact />
      <PrivateRoute path="/" component={Home} />
    </Switch>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.shape({ render: PropTypes.func.isRequired })
  ]).isRequired,
  location: PropTypes.shape({})
};

PrivateRoute.defaultProps = {
  location: {}
};

withHistoryProps.propTypes = {
  history: PropTypes.shape({}),
  toastManager: PropTypes.shape({})
};
withHistoryProps.defaultProps = {
  history: {},
  toastManager: {}
};

export default withRouter(withHistoryProps);
