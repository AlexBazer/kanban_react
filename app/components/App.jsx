import React from 'react';
import Tasks from './Tasks.jsx';
import autobind from 'autobind-decorator';

import TaskActions from '../actions/taskActions.js';
import TaskStore from '../stores/taskStore.js';

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = TaskStore.getState();
    }

    componentDidMount(){
        TaskStore.listen(this.storeChanged);
    }

    componentWillUnmount(){
        TaskStore.unlisten(this.storeChanged);
    }

    @autobind
    storeChanged(state){
        this.setState(state);
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
