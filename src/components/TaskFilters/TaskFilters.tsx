import React, {Component} from 'react';
import "./TaskFilters.css"

export default class TaskFilters extends Component<{ filterChangeHandler: Function }, {}> {
    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'completed', label: 'Completed'},
    ]
    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {filterChangeHandler} = this.props;
            return (
                <li key={name}>
                    <button type="button"
                            onClick={() => {
                                filterChangeHandler(name)
                            }}>{label}</button>
                </li>
            )
        })
        return (
            <ul className="filters">
                {buttons}
            </ul>
        )
    }
}