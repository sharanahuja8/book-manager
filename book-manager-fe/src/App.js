import React, { Component } from 'react';
import LeftSection from './views/leftSection';
import RightSection from './views/rightSection';
import './style/App.css'
import { VIEW, ADD } from './contants/constants'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        activeView: VIEW,
        editFlow : false
    }
  }

  handlePaneClick = (activeView) => {
    this.setState({
      activeView:activeView,
      editFlow:false
    })
  }

  editView = () => {
    this.setState({
      activeView:ADD,
      editFlow:true
    })
  }

  render() {
    return (
      <div>
        <LeftSection handlePaneClick={this.handlePaneClick} activeView={this.state.activeView}/>
        <RightSection activeView={this.state.activeView} editView={this.editView} editFlow={this.state.editFlow}/>
      </div>
    );
  }
}

export default App;
