import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Instructions from './components/Instructions/Instructions';
import Test from './components/Quiz/Test';
import Summary from './components/Quiz/Summary';

function App() {
  return (
    <Router>
      <Route path="/react-quiz-app/" exact component={Home} />
      <Route path="/react-quiz-app/play/instructions" exact component={Instructions} />
      <Route path="/react-quiz-app/play/test" exact component={Test} />
      <Route path="/react-quiz-app/play/result" exact component={Summary} />
    </Router>
  );
}

export default App;
