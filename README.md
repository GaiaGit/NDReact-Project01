# MyReads Project

Bookshelf app that allows the user to select and categorize books by 'Read', 'Currently reading' or 'Want to read'. It also includes a Search feature to add new books.

<img src="https://image.ibb.co/d5Q1pe/app_preview.png">

## GETTING STARTED
This project was bootstrapped with [Create React App] (https://github.com/facebookincubator/create-react-app).
You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

* PRE-REQUISITES
~~~
NodeJS
~~~

* Install all project dependencies with
~~~
$ npm install
~~~
* Launch app with
~~~
$ npm start
~~~
* Live project will be available at
~~~
http://localhost:3000/
~~~


## PROJECT SPECIFICATIONS
## Backend Server

Udacity provides a backend server to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
