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
}

export default alt.createStore(LaneStore, 'LaneStore');
