import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

class Dashboard extends Component {

  render() {
    const { bookList, bookShelves, dataLoading, changeCategory } = this.props;

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {
            bookShelves.map( shelf => {
              const shelfBooks = bookList.filter( book => {
                return (book.shelf === shelf.category) ? book : null;
              } );
              return (<BookShelf key={shelf.id} shelf={shelf} shelfBooks={shelfBooks} dataLoading={dataLoading} changeCategory={changeCategory} />)
            } )
          }
        </div>
        <div className="open-search">
          <Link to={'/search'}>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Dashboard;
