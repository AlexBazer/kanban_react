import uuid from 'uuid';
import alt from '../libs/alt.js';
import TaskActions from '../actions/taskActions.js';

class TaskStore {
    constructor() {
        this.bindActions(TaskActions);

        this.tasks = [];

        this.exportPublicMethods({
            getTasksById: this.getTasksById.bind(this)
        })
    }

    create(task){
        const tasks = this.tasks;

        task.id = uuid.v4();

        this.setState({
            tasks: tasks.concat(task)
        });
        return task;
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

    remove(id){
        this.setState({
            tasks: this.tasks.filter(task => task.id != id)
        });
    }

    getTasksById(ids){
        return ids.reduce((tasks, id)=>{
            return tasks.concat(this.tasks.filter(task=>{
                return task.id === id;
            }))
        }, []);
    }
}

export default alt.createStore(TaskStore, 'TaskStore');
