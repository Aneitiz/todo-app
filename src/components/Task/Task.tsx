import React, {Component} from 'react';
import "./Task.css";


export default class Task extends Component {
    static defaultProps: any;
    onLabelClick = () => console.log(`works`);
    onInputClick = () =>{}

    render(): any {
        let a = JSON.parse(JSON.stringify(this.props))
        return a.todoData.map((element: any) => {
            const {id, liClass, label, createTime,} = element;
            return (
                <li key={id} className={liClass}>
                    <div className="view">
                        <input className="toggle" type="checkbox" onClick={this.onInputClick}/>
                        <label htmlFor={id} onClick={this.onLabelClick}>
                            <span className="description">{label}</span>
                            <span className="created">{createTime}</span>
                        </label>
                        <button className="icon icon-edit"></button>
                        <button className="icon icon-destroy"></button>
                    </div>
                    <input type="text" className="edit" defaultValue="Editing task"/>
                </li>
            )
        })
    }
}

