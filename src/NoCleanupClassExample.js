import React from 'react'
import { render } from '@testing-library/react'

class NoCleanupClassExample extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }


    // Notice how we have to duplicate the code between
    // these two lifecycle methods in class:
    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`
    }

    componentDidUpdate() {
        document.title = `You clicked this ${this.state.count} times`
    }

}

render() {
    return (
        <div>
            <p>You clicked {this.state.count} times</p>
            <button onClick = {() => this.ListeningStateChangedEvent({count: this.state.count + 1})}>
                Click me!
            </button>
        </div>
    )
}

export default NoCleanupClassExample