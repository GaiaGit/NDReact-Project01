import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookCollection from './BookCollection'
import BookSearch from './BookSearch'

class BooksApp extends Component {

  state = {
    dataLoading: false,
    bookList: []
  };

  constructor(props){
    super(props);

    this.bookShelves = [
      {
        id: 0,
        text: "Currently Reading",
        category: "currentlyReading",
        icon: "fa-book-open"
      },{
        id: 1,
        text: "Want to Read",
        category: "wantToRead",
        icon: "fa-bookmark"
      },{
        id: 2,
        text: "Read",
        category: "read",
        icon: "fa-book"
      }
    ];
  }

  componentDidMount() {
    this.getMyReads();
  }

  /**
  * @description API Connection to get the list of books that have a shelf assigned
  * @return BookList state updated
  */
  getMyReads() {
    this.setState({dataLoading: true});
    BooksAPI.getAll().then( books => {
      this.setState({
        bookList: books,
        dataLoading: false
      })
    });
  }

  /**
  * @description Update Book List if a books's shelf is changed
  * @param {string} bookShelf - New shelf for the selected book
  * @param {object} bookData - Selected book
  * @return BookList state updated
  */
  changeCategory = (bookShelf, bookData) => {
    const index = this.state.bookList.findIndex(book => book.id === bookData.id);
    const newBookList = this.state.bookList.slice()

    if(index > 0) {
      newBookList[index].shelf = bookShelf;
      BooksAPI.update(bookData, bookShelf).then( books => {
        this.setState({
          bookList: newBookList
        })
      });
    } else {
      bookData.shelf = bookShelf;
      newBookList.push(bookData);
      BooksAPI.update(bookData, bookShelf).then( books => {
        this.setState({
          bookList: newBookList
        })
      });
    }
  }

  render() {

    // Display animation while data is loaded
    if(this.state.dataLoading) {
      return(
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      )
    }
    else {
      return (
        <div>
          <Route exact path="/" render={({ history }) => (
            <BookCollection bookShelves={this.bookShelves} bookList={this.state.bookList} dataLoading={this.state.dataLoading} changeCategory={this.changeCategory} />
          )} />
          <Route path="/search" render={({ history }) => (
            <BookSearch changeCategory={this.changeCategory} />
          )} />
        </div>
      )
    }
  }
}

export default BooksApp
