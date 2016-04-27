import React from 'react';
import autobind from 'autobind-decorator';

const connect = function(Component, store){
    return class Connect extends React.Component{
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

        render() {
            return <Component {...this.props} {...this.state} />;
        }
    };
};

export default (store) => {
    return (target) => connect(target, store);
}
