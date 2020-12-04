// import React, { Component } from 'react';
// import { render } from 'react-dom';

function Heading() {
    return <div className="Header-Box">
        <div className="toggle">
            <div class="user-toggle">
                <div role="status" class="[ visually-hidden ][ js-mode-status ]"></div>
                <button class="[ toggle-button ] [ js-mode-toggle ]">
                    <span class="[ toggle-button__text ] [ js-mode-toggle-text ]">Enable dark mode</span>
                    <span class="toggle-button__icon" aria-hidden="true"></span>
                </button>
            </div>
            
            toggle</div>
        <div className="devjobs">devjobs</div>
    </div>
}

document.documentElement.classList.remove('no-js');


export default Heading