import uuid from 'uuid';
import alt from '../libs/alt';

import LaneActions from '../actions/laneActions';

/**
 * Lane store actions handlers
 */
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

    /**
     * Add new taskId to lane tasks
     * Remove this task from old lane id lane was changed
     */
    attachToLane({laneId, taskId}){
        const lanes = this.lanes.map(lane => {
            if (lane.id != laneId){
                // remove task from old lane
                lane.tasks = lane.tasks.filter(task => task != taskId)
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
    /**
     * Remove task from lane
     */
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

    /**
     * Handle task moves in one lane and from one lane to another
     */
    move({sourceId, targetId}) {
        var lanes = this.lanes;
        const sourceLane = this.lanes.reduce((result, lane) =>
            lane.tasks.includes(sourceId)?lane:result,
            undefined
        );
        const targetLane = this.lanes.reduce((result, lane) =>
            lane.tasks.includes(targetId)?lane:result,
            undefined
        );
        if (sourceLane === targetLane){
            // Substitute 2 ids
            sourceLane.tasks = sourceLane.tasks.map(task => {
                if (task === sourceId) return targetId
                else if(task === targetId) return sourceId
                else return task
            })
        } else {
            // Remove id from sourceLane tasks
            sourceLane.tasks = sourceLane.tasks.filter(
                task => task !== sourceId
            )
            // Add to targetLane tasks
            targetLane.tasks = targetLane.tasks.reduce((result, task) => {
                if (task === targetId) return result.concat([sourceId, targetId])
                else return result.concat(task)
            }, [])
        }
        this.setState({lanes});
    }
}

export default alt.createStore(LaneStore, 'LaneStore');
