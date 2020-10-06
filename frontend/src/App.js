import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {
  ViewMain,
  ViewQuestionsByCategory,
  ViewQuestionsByQuestion,
  ViewEditor,
  ViewEditCategory,
  ViewRecords
} from './pages'
import { Header } from './components'

import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={ViewMain} />
        <Route exact path='/view/:id' component={ViewQuestionsByCategory} />
        <Route exact path='/quest/:type' component={ViewQuestionsByQuestion} />
        <Route exact path='/edit' component={ViewEditor} />
        <Route exact path='/edit/:id' component={ViewEditCategory} />
        <Route exact path='/record' component={ViewRecords} />
      </Switch>
    </Router>
  );
}

export default App;
