import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Instructions from './components/Instructions/Instructions';
import Test from './components/Quiz/Test';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play/instructions" exact component={Instructions} />
      <Route path="/play/test" exact component={Test} />
    </Router>
  );
}

export default App;
