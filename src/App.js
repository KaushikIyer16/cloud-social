import setupDucks from './ducks'
import { Provider } from 'react-redux'
import Home from './home'
import Navigator from './common/navigator'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Provider store={setupDucks()}>
      <Router>
        <Navigator />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
