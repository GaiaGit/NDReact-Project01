import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookResults: [],
      query: '',
      dataLoading: false,
      error: false
    }
  }

  /**
  * @description Control input search
  * @param {boolean} dataLoading - Search in progress
  * @return Autofocus the input element after every search
  * TODO: Improve by adding Autosuggest function
  */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataLoading !== this.state.dataLoading) {
      document.querySelector('#inputSearch').focus();
    }
  }

  /**
  * @description API connection to get results based on query text
  * @param {string} query - Input text to search
  * @return Update bookResults state if valid data returned by API
  */
  searchQuery(query) {
    const term = query.trim();
    this.setState({
      query: query,
      dataLoading: true
    });
    if(term !== "" && term.length > 0) {
      BooksAPI.search(query.trim(), 10).then( results => {

        if(results.error && results.error === "empty query") {
          this.setState({dataLoading: false, error: true, bookResults: []});
        }
        else {
          if(this.state.bookResults !== results && results !== []) {
            results.map(res => res.shelf = "none");
            this.setState({bookResults: results, error: false, dataLoading: false});
          }
        }
      });
    }
  }

  render() {

    const { changeCategory } = this.props;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={'/'} className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input  type="text"
                    placeholder="Search by title or author"
                    value={ this.state.query }
                    onChange={ ev => this.searchQuery(ev.target.value) }
                    disabled={this.state.dataLoading === true && this.state.query !== ""}
                    autoFocus
                    id="inputSearch" />
          </div>
        </div>
        <div className="search-books-results">
        <ol className="books-grid">
          {
            ( this.state.query.trim() &&
              typeof this.state.bookResults !== 'undefined' &&
              this.state.dataLoading === false &&
              this.state.bookResults !== [] &&
              this.state.bookResults.length > 0 &&
              this.state.bookResults !== "empty query" && !
              this.state.bookResults.error)
            ?
              this.state.bookResults.map(book => {
                return (
                  <Book bookData={book} key={book.id} changeCategory={changeCategory} />
                )
              })
            : "No results"
          }
        </ol>
      </div>
    </div>
    )
  }
}

export default BookSearch;
