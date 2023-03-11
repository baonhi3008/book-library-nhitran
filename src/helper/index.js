const axios = require('axios')
const {ALL_BOOKS,BOOK_BY_ID} = require('../constants/index')
require('dotenv').config();

async function callExternalAPI(url) {
    return await axios.get(url)
    .then(response => response.data)
}
async function getAllBooks(){
    // eslint-disable-next-line no-undef
    const allBooks = await callExternalAPI(process.env.BOOK_URL_API+ALL_BOOKS)
    const ratingPromise = allBooks.books.map((book)=>(
       // eslint-disable-next-line no-undef
       callExternalAPI(process.env.BOOK_URL_API+BOOK_BY_ID+book.id)
    ))
    const ratings = await Promise.all(ratingPromise)

    const result = allBooks.books.map((book, index) => ({
        id: book.id,
        Name: book.Name,
        Author: book.Author,
        rating: ratings[index].rating
      }))
    return result
}

function groupBy (input,key) {
    return input.reduce((acc,currentValue)=>{
        let groupKey = currentValue[key]
        if(!acc[groupKey]){
            acc[groupKey] = []
        }
        acc[groupKey].push(currentValue)
        return acc
    },
    {})
}

module.exports = {callExternalAPI,groupBy,getAllBooks};
