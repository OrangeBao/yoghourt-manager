import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';

import Library from './library';

if (module.hot) {
  module.hot.accept('./library', function() {
    console.log('Accepting the updated library module!');
    Library.log();
  })
}

function initComponent() {
  ReactDOM.render(
    (
      <div>
        <span className="hello" >hello world!</span>
        <div className="img" />
      </div>
    ),
    document.getElementById('root')
  );
}

initComponent();
