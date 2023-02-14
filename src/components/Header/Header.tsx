import React from 'react';
import "./Header.css"
import NewTaskForm from "../NewTaskForm"
const Header = (props: any) => {
    return (
        <header className="Header">
            <h1>todos</h1>
            <NewTaskForm/>
        </header>


    )
}

export default Header;