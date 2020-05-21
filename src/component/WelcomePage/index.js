import React, {useContext, useReducer} from "react";
import { usePersistedContext, usePersistedReducer } from '../usePersist';
import { removeItemFromLocalStorage } from "../../helper";
import reducer from '../reducer';
import Store from "../context";
import TodoForm from "../Task/TodoForm";
import TodoList from "../Task/TodoList";
import Button from '@material-ui/core/Button';

const WelcomePage = (props) => {
    const globalStore = usePersistedContext(useContext(Store), "state");

    const [state, dispatch] = usePersistedReducer(
        useReducer(reducer, globalStore),
        "state" // The localStorage key
    );

    const logOutUser = () => {
        const { history } = props;
        removeItemFromLocalStorage("userInfo");
        history.push("/login");
    };


    return (
        <Store.Provider value={{ state, dispatch }}>
            <div className="">
                <div className="main-container">
                    <button
                        className="logout-btn"
                        onClick={() => logOutUser()}
                    >LogOut</button>
                    <div className="inner-container">
                        <TodoForm />
                        <TodoList />
                    </div>


                </div>
            </div>


        </Store.Provider>
  );
};

export default WelcomePage;
