import React from 'react';
import { withRouter } from "react-router-dom";

class Greetings extends React.Component {
    render() {
        return (
            <div>
                {this.props.helloMessage}<br/>
                {this.props.byeMessage}
            </div>
        );
    }    
}

class HelloWorld extends React.Component {

    /**
     * Props are received and used as is (can't be updated).
     *
     * Functions can be passed as props used as callbacks for events.
     * 
     * State is internal, state changes trigger re rendering of the component its children.
     */
    constructor(props) {
        super(props);
        this.state = {
            byeMessage: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                byeMessage: 'Goodbye!'
            })
        }, 3000);
    }

    /**
     * Renders the component.
     * 
     * This method returns JSX.
     */
    render() {
        return (
            <Greetings helloMessage="Hello!" byeMessage={this.state.byeMessage}/>
        );
    }
}

export default withRouter(HelloWorld)