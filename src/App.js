import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Instructions from './components/Instructions/Instructions';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play/instructions" exact component={Instructions} />
    </Router>
  );
}

export default App;
