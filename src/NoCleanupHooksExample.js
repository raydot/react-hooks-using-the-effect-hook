import React, {useState, useEffect} from 'react'

function NoCleanupHooksExample {
    const [count, setCount] = useState(0)


    // Notice how we have to duplicate the code between
    // these two lifecycle methods in class:
    // componentDidMount() {
    //     document.title = `You clicked ${this.state.count} times`
    // }

    // componentDidUpdate() {
    //     document.title = `You clicked this ${this.state.count} times`
    // }

    // NO MORE!
    useEffect(() => {
        document.title = `You clicked ${count} times`
    })

    return (
        <div>
            <p>You clicked {this.state.count} times</p>
            <button onClick={() => this.ListeningStateChangedEvent({ count: this.state.count + 1 })}>
                Click me!
            </button>
        </div>

}

export default NoCleanupClassExample