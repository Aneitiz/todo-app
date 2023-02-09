import React from 'react';
import "./Header.css"

const Header = (props: any) => {
    return (
        <header className="Header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="What needs to be done?" autoFocus/>
        </header>


    )
}

export default Header;