import React, {Component} from 'react';
import "./Footer.css"
import TaskFilters from "../TaskFilters";

export default class Footer extends Component <{ activeItemsLeft: number, clearCompleted: React.MouseEventHandler<HTMLButtonElement>, filterChangeHandler: Function }, {}> {

    render() {
        const {activeItemsLeft, clearCompleted, filterChangeHandler} = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">{activeItemsLeft} items left</span>
                <TaskFilters filterChangeHandler={filterChangeHandler}/>
                <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
            </footer>
        )
    }
}

