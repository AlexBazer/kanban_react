import React from 'react';
import Tasks from './Tasks.jsx';
import connect from '../decorators/connect.js';
import TaskActions from '../actions/taskActions.js';
import TaskStore from '../stores/taskStore.js';

@connect(TaskStore)
export default class Lane extends React.Component {
    render(){
        const {lane, ...props} = this.props;
        const tasks = this.state.tasks;
        return (
            <div {...props}>
                <div className="lane-header">
                    <div className="lane-add-task">
                        <button onClick={this.addTask}>+</button>
                    </div>
                    <div className="lane-name">{lane.name}</div>
                </div>
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
