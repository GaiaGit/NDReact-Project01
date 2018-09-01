import React, {Component} from 'react'

import Book from './Book'

class BookShelf extends Component {
  render() {
    const { shelf, shelfBooks } = this.props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelf.text }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              shelfBooks.map(book => {
                return (
                  <Book bookData={book} />
                )
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
