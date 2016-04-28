import uuid from 'uuid';
import alt from '../libs/alt';

import LaneActions from '../actions/laneActions';

class LaneStore{
    constructor(){
        this.bindActions(LaneActions);

        this.lanes = [];
    }

    create(lane){
        const lanes = this.lanes;

        lane.id = uuid.v4();

        lane.tasks = lane.tasks || [];
        this.setState({
            lanes: lanes.concat(lane)
        });
    }

    update(updatedLane){
        const lanes = this.lanes.map(lane => {
            if (lane.id != updatedLane.id){
                return lane;
            }
            return Object.assign({}, lane, updatedLane);
        })
        this.setState({lanes});
    }

    remove(id){
        this.setState({
            lanes: this.lanes.filter(lane => lane.id != id)
        });
    }
    
    attachToLane({laneId, taskId}){
        const lanes = this.lanes.map(lane => {
            if (lane.id != laneId){
                return lane;
            }
            if (lane.tasks.includes(taskId)){
                console.warn('Already in the lane', lanes);
            } else {
                return Object.assign({}, lane, {
                    tasks:[...lane.tasks, taskId]
                });
            }
        })
        this.setState({lanes});
    }

    detachFromLane({laneId, taskId}) {
        const lanes = this.lanes.map(lane => {
            if (lane.id != laneId){
                return lane;
            }
            return Object.assign({}, lane, {
                tasks: lane.tasks.filter(task => task != taskId)
            });
        });
        this.setState({lanes});
    }
}

export default alt.createStore(LaneStore, 'LaneStore');
