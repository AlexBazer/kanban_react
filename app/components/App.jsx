import React from 'react';
import Tasks from './Tasks.jsx';
import autobind from 'autobind-decorator';

import TaskActions from '../actions/taskActions.js';
import TaskStore from '../stores/taskStore.js';

import connect from '../decorators/connect.js';


@connect(TaskStore)
export default class App extends React.Component {
    render(){
        const tasks = this.state.tasks;
        return (
            <div>
                <button
                    className="add-task" onClick={this.addTask}
                >+</button>
                <Tasks
                    tasks={tasks} onEdit={this.editTask}
                    onRemove={this.removeTask}
                />
            </div>
        );
    }

    addTask(){
        TaskActions.create({content:'New task 4'});
    }

    editTask(id, content){
        if (!content.trim()){
            return;
        }
        TaskActions.update({id, content});
    }

    removeTask(id, event){
        event.stopPropagation();
        TaskActions.remove(id);
    }
}
