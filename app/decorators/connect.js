import React from 'react';
import autobind from 'autobind-decorator';


/**
 * Connect decorator
 * Bind store to component
 */
const connect = function(Component, store){
    return class Connect extends Component{
        constructor(props){
            super(props);

            this.state = store.getState();
            store.listen(this.storeChanged);
        }
        componentWillUnmount(){
            store.unlisten(this.storeChanged);
        }

        @autobind
        storeChanged(){
            this.setState(store.getState());
        }
    };
};


export default (store) => {
    return (target) => connect(target, store);
}
