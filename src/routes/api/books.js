const express = require('express');
const bookController = require('../../controllers/books');
const {handleErrors} = require('../../middleware/errorHandler.middleware')
const router = express.Router();

// GET localhost:8080/allbooks
router.get('/allbooks', bookController.handleGet);
router.post('/allbooks',bookController.storeData)
router.get('/allbooks/:id',bookController.getOneBook)
router.patch('/allbooks/:id',bookController.updateLike)
router.get('/allbooks',bookController.sortBook)
// router.get('/allbooks?:author',bookController.getBooksFromAuthor)

// router.get('/author', bookController.grouByAuthor);
// router.use(handleErrors)
module.exports =   router;
