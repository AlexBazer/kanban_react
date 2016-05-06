import React from 'react';
import Tasks from './Tasks.jsx';
import Editable from './Editable.jsx';
import connect from '../decorators/connect.js';
import TaskActions from '../actions/taskActions.js';
import TaskStore from '../stores/taskStore.js';
import LaneActions from '../actions/laneActions.js';
import autobind from 'autobind-decorator';

import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes.js';

import styles from '../styles/main.css';

/**
 *   Drag target contract
 */
const taskTarget = {
    hover(targetProps, monitor){
        // Trigger attachToLane action when druged to the empty lane
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
        if (!targetProps.lane.tasks.length){
            LaneActions.attachToLane({
                laneId: targetProps.lane.id,
                taskId: sourceId
            });
        }
    }
};

/**
* Lane component
* Mount DropTarget and connect Task store
*/
@DropTarget(ItemTypes.TASK, taskTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
@connect(TaskStore)
export default class Lane extends React.Component {
    render(){
        const {connectDropTarget, lane, ...props} = this.props;
        const tasks = this.state.tasks;
        return connectDropTarget(
            <div {...props}>
                <div className={styles.laneHeader}>
                    <div className={styles.laneDelete}>
                        <button onClick={this.removeLane}>x</button>
                    </div>
                    <Editable
                        className={styles.laneName}
                        editing={lane.editing}
                        value={lane.name}
                        onEdit={this.editLaneName}
                        onClick={this.activateLaneEdit}
                    />
                    <div className={styles.laneAddTask}>
                        <button onClick={this.addTask}>+</button>
                    </div>
                </div>
                <Tasks
                    onValueClick={this.activateTaskEdit}
                    tasks={TaskStore.getTasksById(lane.tasks)} onEdit={this.editTask}
                    onRemove={this.removeTask}
                />
            </div>
        );
    }

    @autobind
    activateLaneEdit(){
        const laneId = this.props.lane.id;
        LaneActions.update({id: laneId, editing: true});
    }

    @autobind
    editLaneName(name){
        const laneId = this.props.lane.id;
        if (!name.trim()){
            LaneActions.update({id: laneId, editing: false});
        }
        LaneActions.update({id: laneId, name, editing: false});
    }

    @autobind
    removeLane(){
        const lane = this.props.lane;
        TaskActions.removeTasksById(lane.tasks);
        LaneActions.remove(lane.id);
    }

    @autobind
    activateTaskEdit(id){
        TaskActions.update({id, editing:true});
    }

    @autobind
    editTask(id, content){
        if (!content.trim()){
            TaskActions.update({id, editing: false});
            return;
        }
        TaskActions.update({id, content, editing: false});
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
