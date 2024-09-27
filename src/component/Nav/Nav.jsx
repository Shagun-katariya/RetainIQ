import React from 'react';
import './Nav.css';

function Navbar() {
  return (
    <div className="head">
      <div className="header">
        <div className='sub-head1'>
          <div className="back-arrow">←</div>
          <h2>Rules Creation</h2>
        </div>
        <div className="divider"></div>
      </div>
      
      <div className="button-container">
        <button className="publish-button">Publish Feed</button>
      </div>
    </div>
  );
}

export default Navbar;