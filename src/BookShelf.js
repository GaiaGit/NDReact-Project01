import React from 'react'

import Book from './Book'

function BookShelf(props) {
    const { shelf, shelfBooks, changeCategory } = props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title"><span className={"fas "+ shelf.icon +" shelf-icon" }></span>{ shelf.text }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              shelfBooks.map(book => {
                return (
                  <Book bookData={book} key={book.id} changeCategory={changeCategory} />
                )
              })
            }
          </ol>
        </div>
      </div>
    )
}

export default BookShelf;
