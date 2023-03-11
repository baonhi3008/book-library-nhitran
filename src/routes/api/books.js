const express = require('express');
const bookController = require('../../controllers/books');
const {handleErrors} = require('../../middleware/errorHandler.middleware')
const router = express.Router();

// GET localhost:8080/allbooks
router.get('/allbooks', bookController.handleGet);
router.post('/allBooks',bookController.storeData)
router.get('/allBooks/:id',bookController.getOneBook)
router.patch('/allBooks/:id',bookController.updateLike)
router.get('/allBooks',bookController.getBooksFromAuthor)

// router.get('/author', bookController.grouByAuthor);
// router.use(handleErrors)
module.exports =   router;
