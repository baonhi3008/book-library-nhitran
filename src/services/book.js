const { number } = require('joi')
const prisma = require('../../client')
const { HttpError } = require('../errors')
async function  storeAllBooks (bookFromAPI){
    await Promise.all(bookFromAPI.map(
    (book)=>(
    prisma.book.upsert({
    where: {
      id: book.id,
    },
    update: {
      name: book.Name,
      author: book.Author,
      rating: book.rating
    },
    create: {
      id: book.id,
      name: book.Name,
      author: book.Author,
      rating: book.rating
    },
  }))))
}
async function uploadLikedOrDislike(id,isLikedValue){
  const book = await prisma.book.findUnique({
    where: {
      id: Number(id),
    },
  })
  if(book===null){
    throw new HttpError(404, "Cannot find record")
  }
 
     await prisma.book.update({
      where: {
        id:Number(id)
      },
      data: {
        isLiked: isLikedValue
      },
    })

}
async function getSingleBook(id){
  const book = await prisma.book.findUniqueOrThrow({
    where: {
      id: Number(id),
    },
  })
  return book
  
}
async function getBookByAuthor(author){
  const booksByAuthor = await prisma.book.findMany({
    where: {
      author: author,
    },
  })
  if(booksByAuthor.length==0){
    throw new HttpError(404,'Cannot found any record')

  }
  else{ return booksByAuthor}
 
}
async function sortByRating(){
  const books = await prisma.book.findMany({
    orderBy: {
      rating: {
        rating: 'asc',
      },
    },
  })
  return books
}

// }
module.exports = {storeAllBooks,uploadLikedOrDislike,getSingleBook,getBookByAuthor,sortByRating}