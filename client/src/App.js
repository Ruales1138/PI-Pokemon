import './App.css';
import { Route } from 'react-router-dom';
import InitialPage from './components/InitialPage/InitialPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Create from './components/Create/Create';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={InitialPage}/>
      <Route exact path='/pokemon' component={Home}/>
      <Route exact path='/pokemon/:id' render={({match}) => <Detail match={match}/>}/>
      <Route exact path='/create' component={Create}/>
    </div>
  );
};

export default App;
