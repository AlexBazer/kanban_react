
import React from 'react';
import Tasks from './Tasks.jsx';
import connect from '../decorators/connect.js';
import TaskActions from '../actions/taskActions.js';
import TaskStore from '../stores/taskStore.js';
import LaneActions from '../actions/laneActions.js';
import autobind from 'autobind-decorator';

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
                    tasks={TaskStore.getTasksById(lane.tasks)} onEdit={this.editTask}
                    onRemove={this.removeTask}
                />
            </div>
        );
    }

    @autobind
    editTask(id, content){
        if (!content.trim()){
            return;
        }
        TaskActions.update({id, content});
    }

    @autobind
    addTask(){
        const laneId = this.props.lane.id;
        const task = TaskActions.create({content:'Just new one!'});

        LaneActions.attachToLane({taskId: task.id, laneId});
    }

    @autobind
    removeTask(taskId, event){
        event.stopPropagation();

        const laneId = this.props.lane.id;

        LaneActions.detachFromLane({laneId, taskId});
        TaskActions.remove(taskId);
    }
}
