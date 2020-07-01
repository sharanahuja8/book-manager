import React, { Component } from 'react';
import { saveBook } from '../service/booksService';
import { SUCCESS, FAILURE, POST, PUT } from '../contants/constants'

export default class AddBooks extends Component {

    constructor(props){
        super(props);
        this.state = {
            id:'',
            name:'',
            author:'',
            copies:0,
            description:'',
            method:POST,
            submitResult:'',
            errorMessage:''
        }
    }

    componentDidMount = () => {
        if(this.props.editFlow){
            this.setState({
                id:this.props.book.id,
                name:this.props.book.name,
                author:this.props.book.author,
                description:this.props.book.description,
                copies:parseInt(this.props.book.copies,10),
                method:PUT
            })
        }
    }

    handleChange = (state,value) => {
        if(state === 'copies'){
            this.setState({
                [state]:parseInt(value,10)
            })
        } else {
            this.setState({
                [state]:value
            })
        }
        this.setState({
            submitResult : ''
        })
    }

    handleSubmit = () => {
        saveBook(this.state.id,this.state.name,this.state.description,this.state.author,this.state.copies,this.state.method)
        .then((res) => {
            this.setState({
                submitResult:SUCCESS,
                id:'',
                name:'',
                author:'',
                copies:0,
                description:'',
                method:POST
            })
        }, (err) => {
            this.setState({
                submitResult:FAILURE,
                errorMessage:err.response && err.response.data ? err.response.data : 'Unknown'
            })
        })
    }

    validate = () => {
        if(!this.state.name) return true;
        if(!this.state.author) return true;
        if(!this.state.description) return true;
        if(isNaN(this.state.copies) || this.state.copies < 0) return true;
        return false
    }

    render() {
        return(
            <div>
                <div className='mt-20 ml-30'>
                    <label>Book Name:</label><br />
                    <input type='text' className='mt-10 mr-30 input' name='name' value={this.state.name} onChange={e => this.handleChange('name',e.target.value)} placeholder="Enter the name of book" />
                </div>
                <div className='mt-20 ml-30'>
                    <label>Description:</label><br />
                    <input type='text' className='mt-10 mr-30 input' name='description' value={this.state.description} onChange={e => this.handleChange('description',e.target.value)} placeholder="Enter the description of book" />
                </div>
                <div className='mt-20 ml-30'>
                    <label>Author:</label><br />
                    <input type='text' className='mt-10 mr-30 input' name='author' value={this.state.author} onChange={e => this.handleChange('author',e.target.value)} placeholder="Enter the name of author of book" />
                </div>
                <div className='mt-20 ml-30'>
                    <label>Copies:</label><br />
                    <input type='number' className='mt-10 mr-30 input' name='copies' value={this.state.copies} onChange={e => this.handleChange('copies',e.target.value)} placeholder="Enter the number of copies of book" />
                </div>
                <div className="mt-20 ml-30">
                    {this.state.submitResult === SUCCESS ? "Submitted Successfully" : ''}
                    {this.state.submitResult === FAILURE ? `Error: ${this.state.errorMessage}` : ''}
                </div>
                <button className="mt-20 ml-30 submitButton" onClick={this.handleSubmit} disabled={this.validate()}>SUBMIT</button>
            </div>
        )
    }
}