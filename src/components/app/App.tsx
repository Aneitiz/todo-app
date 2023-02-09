import React from 'react';
import TaskList from '../TaskList';
import Header from '../Header';
import "./App.css";
import Footer from '../Footer';

const App = (props: any) => {
    return (
        <div>
            <Header/>
            <section className="main">
                <TaskList/>
                <Footer/>
            </section>

        </div>
    )
}

export default App;
