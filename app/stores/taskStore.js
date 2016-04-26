import uuid from 'node-uuid';
import alt from '../libs/alt';
import TaskActions from '../atcions/taskActions.js';

class TaskStore {
    constructor() {
        this.bindActions(TaskActions);

        this.tasks = [];
    }
    create(task){
        const tasks = this.tasks;

        task.id = uuid.v4();

        this.setState({
            tasks: tasks.concat(taks);
        })
    }
    update(updatedTask){
        const tasks = this.tasks.map(task => {
            if(task.id === updatedTask.id){
                return Object.assign({}, task, updatedTask);
            }
            return task;
        });
        this.setState({tasks});
    }
    delete(id){
        this.setState({
            tasks: this.tasks.filter(taks => node.id != id)
        });
    }
}

export default ald.createStore(TaskStore, 'TaskStore');
