import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../component/Login';
import '../css/style.css';
import WelcomePage from "../component/WelcomePage";
import PageNotFound from "../component/PageNotFound";
import { getLocalstorage } from '../helper';

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



const AppRoutes = () => {
    return (
        <Switch>
            <Route exact path = '/Login' component = {Login} />
            <PrivateRoute exact path = '/tasks' component = {WelcomePage} />
            <Route component={PageNotFound} />
        </Switch>
    );
}


export default AppRoutes;
