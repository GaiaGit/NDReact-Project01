import React from 'react'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

function Dashboard(props) {

  const { bookList, bookShelves, dataLoading, changeCategory } = props;

  // Display animation while data is loading
  if(dataLoading) {
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        </div>
      </div>
    )
  }
  else {
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
