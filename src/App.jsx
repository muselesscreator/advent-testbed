import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigator from 'containers/Navigator';
import './App.scss';

export const App = ({}) => (
  <Router>
    <div>
      <main>
        <Navigator />
      </main>
    </div>
  </Router>
);
App.defaultProps = {
};
App.propTypes = {
};

export default App;
