import React, { Component } from 'react';
import { VIEW, ADD } from '../contants/constants'

export default class LeftSection extends Component {

    render() {
    return(
        <React.Fragment>
            <section className='left-section'>
                <div className='width-300'>
                    <ul>
                        <li><button className={this.props.activeView === VIEW ? 'selected button-left' : 'button-left'} onClick={() => this.props.handlePaneClick(VIEW)} >View Books</button></li>
                        <li><button className={this.props.activeView === ADD ? 'selected button-left' : 'button-left'} onClick={() => this.props.handlePaneClick(ADD)}>Add Books</button></li>
                    </ul>
                </div>
            </section>
        </React.Fragment>
    )}
}


