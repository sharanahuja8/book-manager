import React, { Component } from 'react';
import { getBooksList, deleteBook} from '../service/booksService'

export default class ViewBooks extends Component {


    constructor(props){
        super(props);
        this.state = {
            bookList:[],
            name:'',
            author:'',
            errorMessage :''
        }
    }

    hitGetRequest = () => {
        getBooksList(this.state.name,this.state.author)
        .then((res) => {
            let bookList = res.data ? res.data : [];
            this.setState({
                bookList
            })
        },(err) => {
            this.setState({
                errorMessage : err.response && err.response.data ? err.response.data : "Unknown"
            })
        })
    }

    componentDidMount = () => {
        this.hitGetRequest();
    }

    handleDelete = (id) => {
        deleteBook(id)
        .then((res) => {
            this.hitGetRequest();
        },(err) => {
            this.setState({
                errorMessage : err.response && err.response.data ? err.response.data : "Unknown"
            })
        })
    }

    handleChange = async (state,value) => {
        await this.setState({
            [state]:value
        })
        this.hitGetRequest();
    }
    
    getRowsData = () => {
        return this.state.bookList.map((book) => {
            return(
                <div className="divTableRow" key={book.id}>
                    <div className="divTableCell">{book.name}</div>
                    <div className="divTableCell">{book.description}</div>
                    <div className="divTableCell">{book.author}</div>
                    <div className="divTableCell">{book.copies}</div>
                    <div className="divTableCell"><button className='viewButton editButton' onClick={e => this.props.handleEdit(book)}>Edit</button></div>
                    <div className="divTableCell"><button className='viewButton deleteButton' onClick={e => this.handleDelete(book.id)}>Delete</button></div>
                </div>
            )
        })
    }

    render() {
        return(
            <div className="mt-30 mr-30 ml-30">
                <div className="divTable">
                    <div className="divTableHeading">
                        <div className="divTableRow">
                            <div className="divTableHead">
                                Book Name<br />
                                <input className="mt-10 inputSmall" type="text" name="name" value={this.state.name} onChange={e => this.handleChange('name', e.target.value)} placeholder="Search by Book Name" />
                            </div>
                            <div className="divTableHead">Description</div>
                            <div className="divTableHead">
                                Author<br />
                                <input className="mt-10 inputSmall" type="text" name="author" value={this.state.author} onChange={e => this.handleChange('author', e.target.value)} placeholder="Search by Author Name" />
                            </div>
                            <div className="divTableHead">Copies</div>
                            <div className="divTableHead">Edit</div>
                            <div className="divTableHead">Delete</div>
                        </div>
                    </div>
                     <div className="divTableBody">{this.getRowsData()}</div>
                </div>
                {this.state.errorMessage}
            </div>
        )
    }
}