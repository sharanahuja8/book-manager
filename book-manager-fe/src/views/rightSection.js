import React, { Component } from 'react';
import ViewBooks from './viewBooks';
import AddBooks from './addBooks';
import { VIEW } from '../contants/constants'

class RightSection extends Component{

    constructor(props){
        super(props);
        this.state = {
            book:{}
        }
    }

    handleEdit = (book) => {
        this.setState({book});
        this.props.editView();
    }

    render() {
        return(
            <div className='pl-300'>
                <div className="ml-30 mt-20 fs-2">BOOK MANAGEMENT SYSTEM</div>
                {this.props.activeView === VIEW ? 
                    <ViewBooks handleEdit={this.handleEdit}/>
                    : <AddBooks book={this.state.book} editFlow={this.props.editFlow}/>
                }
            </div>
        )
    }
}

export default RightSection;


