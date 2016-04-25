import React from 'react';
import Tasks from './Tasks.jsx';
import autobind from 'autobind-decorator';

import uuid from 'uuid';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [
                {
                    id: uuid.v4(),
                    content: 'task 1'
                },
                {
                    id: uuid.v4(),
                    content: 'task 2'
                },
                {
                    id: uuid.v4(),
                    content: 'task 3'
                },
            ]
        }
    }
    render(){
        return (
            <div>
                <button
                    className="add-task" onClick={this.addTask}
                >+</button>
                <Tasks
                    tasks={this.state.tasks} onEdit={this.editTask}
                    onRemove={this.removeTask}
                />
            </div>
        );
    }

    @autobind
    addTask(){
        this.setState({
            tasks:this.state.tasks.concat([{
                id: uuid.v4(),
                content: 'task 4'
            }])
        })
    }

    @autobind
    editTask(id, content){
        if (!content.trim()){
            return;
        }

        const tasks = this.state.tasks.map(task => {
            if (task.id == id){
                task.content = content;
            }
            return task;
        });

        this.setState({tasks});
    }

    @autobind
    removeTask(id){
        const tasks = this.state.tasks.filter(task => {
            if (task.id != id){
                return task;
            }
        });
        this.setState({tasks});
    }
}
