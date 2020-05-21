import React, { Component } from "react";
// import FacebookLogin from 'react-facebook-login';
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
import { setLocalstorage, getLocalstorage } from "../../helper";

class Login extends Component {
  state = {
    authenticationError: false,
    redirectToReferrer: !!getLocalstorage("userInfo")
  };
  render() {
    const { history, location } = this.props;
    const { redirectToReferrer } = this.state;
    const responseGoogle = response => {
      console.log(response);

      const { tokenObj } = response;
      const userInfo = tokenObj && tokenObj.access_token;
      setLocalstorage("userInfo", userInfo);
      // dispatch({
      //     type: AUTH_ACTION.LOGIN_SUCCESS,
      //     payload: userInfo
      // });

      if (userInfo) {
        history.push("/tasks");
      } else {
        this.setState({
          authenticationError: true
        });
      }

      // console.log("Login Failed", e.message); use try-catch
    };
    // export const userLogout = (requestMethod = request) => {
    //     return function(dispatch) {
    //         return requestMethod(apiServices.userLogoutParams())
    //             .then(data => {
    //                 dispatch({
    //                     type: AUTH_ACTION.LOGIN_SUCCESS
    //                 });
    //                 return data;
    //             })
    //             .catch(e => {
    //                 console.log("Logout Failed", e.message);
    //             });
    //     };
    // };
    const { from } = location.state || { from: { pathname: "/tasks" } };
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="container">
        <div className="header">
          <h1 style={{ fontSize: "54px" }}>My Tasks Recorder</h1>
        </div>

        <div className="google-btn">
          <GoogleLogin
            clientId="1037443967082-66k0spp51ltnit50ao8snqftjmfteg7u.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
      </div>
    );
  }
}

export default Login;
