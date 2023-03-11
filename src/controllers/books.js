const helper = require('../helper/index')
const services = require('../services/book')
async function handleGet(req,res,next){
    try {
       const fetchAllBooks = await helper.getAllBooks()

       const groupByAuthor = await helper.groupBy(fetchAllBooks,"Author")
       
       if(req.query.author===undefined){
        return res.json(groupByAuthor)
       }else{
        console.log(req.query.author)
        const resultFromService = await services.getBookByAuthor(req.query.author)
        const result = {
            "author": req.query.author,
            "list of book": resultFromService
        }
        return res.json(result)
       }                 
    }
        catch (error){
            next(error)
        }
}
async function storeData(req,res,next){
    try{
        const booksFromAPI = await helper.getAllBooks()
        const storedData = await services.storeAllBooks(booksFromAPI)
        res.status(200).send("Store all books in database")
        return res.json(storedData)
    }
    catch(error){
        next(error)

    }
}
async function updateLike(req,res,next){
    try{
        
        const {isLiked} = req.body
        console.log(req.body)
        await services.uploadLikedOrDislike(req.params.id,isLiked)
        res.status(200).send('Update successfully')
        res.json()
    } catch(error){
        next(error)
    }
}
async function getOneBook(req,res,next){
    try{
        console.log(req.params.id)
        const book = await services.getSingleBook(req.params.id)
        const displayResult = {
            id: book.id,
            author: book.author,
            name: book.name,
            isLiked: book.isLiked
        }
        res.send(displayResult) // send book to display
    }catch(error){
        next(error)

    }
}
async function getBooksFromAuthor(req,res,next){
    try {
        // const allBookGrouped = handleGet()
        // const{author} = req.query
    //     const {author} = req.query
    //    console.log(author)
        // console.log(req.query.author )
        console.log(req.query)
        const result = services.getBookByAuthor(req.query.author)
        // const result = allBookGrouped[author]
        res.json(result)

    }catch(error){
        next(error)
    }
}
async function sortBook(req,res,next){
    try{
        // const isSorted = req.params.sort
        const books = await services.sortByRating()
        return res.json(books)
    }catch(error){
        next(error)
    }
}


module.exports = {handleGet,storeData,updateLike,getOneBook,getBooksFromAuthor,sortBook}
