
// exports.callAPI (req,res,next)=>{
//     // axios.get(API_1)
//     //     .then(
//     //     response => {
//     //         console.log(response)
//     //     })
//     //     .catch(error => next(error) )
    
//     }
// exports.getPosts = (req, res, next) => {
//     res.status(200).json({
//       posts: [{ title: 'First Post', content: 'This is the first post!' }]
//     });
//   };
const API_1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks'
const API_2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/'


const helper = require('../helper/index')
// const { callExternalAPI } = require('../test')
async function handleResquest(req,res,next){
    try {
        const response = await helper.callExternalAPI(API_1)
        const ratingPromise = response.books.map((book)=>(
            helper.callExternalAPI(`${API_2}${book.id}`)
        ))
        const ratings = await Promise.all(ratingPromise)
        // console.log(ratings)
        const bookWithRating = response.books.map((book,index)=>({
            ...book,
            rating: ratings[index].rating
        }))
        console.log(bookWithRating)
        const byAuthor = helper.groupBy(bookWithRating,"Author")
        return res.json(byAuthor)
    }
        catch (error){
            next(error)
        }
}

module.exports = {handleResquest}
    // exports.getPosts = (req, res, next) => {
    //     res.status(200).json({
    //       posts: [{ title: 'First Post', content: 'This is the first post!' }]
    //     });
    //   };
