const API = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev'
async function getCategories() {
    const response = await fetch(API+'/allBooks');
    const books = await response.json();
    const ratingPromises= books.books.map((book) =>
        fetch(API+'/findBookById/'+book.id)
        .then((response) => response.json())
      )
    const ratings = await Promise.all(ratingPromises)
    // console.log(ratings)
    const result = books.books.map((book, index) => ({
        id: book.id,
        Name: book.Name,
        Author: book.Author,
        rating: ratings[index].rating
      }))
    return result
}

// console.log(getCategories())
getCategories().then(function(result) {
    console.log(result) // "Some User token"
 })