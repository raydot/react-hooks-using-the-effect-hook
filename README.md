# React Hooks -- Using the Effect Hook

From [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html) in the React Docs.

Notes:

Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.  

There are two common side effects in React components: those that don't require cleanup, and those that do.

Sometimes we want to run some additional code after React has updated the DOM.  Network request, manual DOM mutations, and logging are common examples of effects that don't require a cleanup.  We can run them and immediately forget about them.  (See NoCleanupClassExample.js)

__What does useEffect do?__ It tells React that your component needs to do something after render.  React will remember the function you passed as call it later after performing DOM updates.

__Why is useEffect called inside a component?__ Placing `useEffect` inside the component lets us access the `count` state variable (or any props) right from the effect.  We don't need a special API -- it's already in the function scope.  Hooks embrace closures and avoid introducing React-specific code where JS already has a solution.

__Does useEffect run after every render?__  Yes.

## Effects Without Cleanup

```
function Example() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        document.title = `You clicked ${count} times`
    })
}
```
Declare the `count` state variable and then tell React we need to use an effect.  Pass a function to the `useEffect` hook.  The function _is_ the effect.  The latest `count` can be read because it's in the scope of the function.  React will remember tje effect and run it after updating the DOM.

Every re-render schedules a _different_ effect, replacing the previous one.  Each effect "belongs" to a particular render.

## Effects With Cleanup
(Code found in CleanupClassExample.js)

__Why did we return a function from our effect?__ This is the optional cleanup mechanism for effects.  Every effect may return a function that cleans up after it.  This allows the logic for adding and removing subscriptions close to each other.

__When does React clean up an effect?__  React performs the cleanup when the component unmounts.  Remember: effects run for every render.  This is why React _also_ cleans up effects from the previous render before running the effects the next time.

> __Note__
> 
> A function named `cleanup` doesn't have to be used with the effect.
> It could return an arrow function, or be called something different.

## Tips for Using Effects

### Tip: Use Multiple Effects to Separate Concerns
(see MultipleEffects.js)

### Tip: Optimizing Performance by Skipping Effects:
In some cases, cleaning up or applying the effect after every render might create a performance problem.  In class components, this is solved by writing an extra comparison with `prevProps` or `prevState` inside `componentDidUpdate`:

```
componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
        document.title = `You clicked ${this.state.count} times.
    }
}
```

This is _built in_ to the `useEffect` hook API.  You can tell React to _skip_ applying an effect if certain values haven't changed between re-renders.  To do this, pass an array as a second optional argument to `useEffect`.

```
useEffect(() => {
    document.title = `You clicked ${count} times`
}, [count]) // Only re-run the effect if the count changes
```

This also works for effects that have a cleanup phase:
```
useEffect(() => {
    function handleStatusChange(status) {
        setIsOnline(status.isOnline)
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
    return () => {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    }
}, [props.friend.id]) // Only re-subscribe if props.friend.id changes
```

> __Note__
> 
> If the `[]` optimization is used, make sure the array includes __all values from the component scope (such as props and state) that change over time and that are used by the effect.__ Otherwise, the code will reference stale values from previous renders.
>
>To run an effect and clean it up only once (mount and unmount), pass an empty array (`[]`) as a second argument.  This tells React that your effect doesn't depend on _any_ values from props or state, so it never needs to rerun.
>
> React suggests using ESLint's `exhaustive-deps` rule to make sure all of this happens as planned. 

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
