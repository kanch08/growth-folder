import React from "react";

export const TodoHeader = (props) => (
    <div>
        <h1>ToDo List</h1>
        <div>
            {props.children}
        </div>
    </div>
);
