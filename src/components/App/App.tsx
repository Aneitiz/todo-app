import React, {Component} from 'react';
import TaskList from '../TaskList';
import Header from '../Header';
import Footer from '../Footer';
import "./App.css";

export type oneTask = {
    id: number,
    liClass? : string,
    label: string,
    createTime: string,
}

export interface stateData {
    todoData : oneTask[],
    isEditing : boolean,
    isCompleted : boolean,
    classNames : classNames,

}

type classNames = {
    completed : string,
    editing : string,
}

class App extends Component {

    state : stateData = {
        todoData : [
            {
                id: 1,
                liClass : "completed",
                label: "Completed task",
                createTime: 'created 17 seconds ago',
            }, {
                id: 2,
                liClass : "editing",
                label: "Editing Task",
                createTime: 'created 5 minutes ago',
            }, {
                id: 3,
                label: "Active task",
                createTime: 'created 5 minutes ago',
            }
        ],
        isEditing: false,
        isCompleted : false,
        classNames : {
            completed : 'completed',
            editing : 'editing',
        },
    }
    render() {
        return (
            <div className='container'>
                <Header/>
                <section className="main">
                    <TaskList todoData = {this.state.todoData}
                              isCompleted={this.state.isCompleted}
                              isEditing={this.state.isEditing}
                              classNames={this.state.classNames}  ></TaskList>
                    <Footer/>
                </section>
            </div>
        )
    }
}


export default App;
