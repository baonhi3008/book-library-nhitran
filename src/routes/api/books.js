const express = require('express');
const validatorSchema = require('../../schema/book')
const bookController = require('../../controllers/books');
const errorHandler = require('../../middleware/errorHandler.middleware')
const validator = require('../../middleware/validation');
const { queryForAuthor, paramBookById, patchIsLiked } = require('../../schema/book');
const router = express.Router();

// GET localhost:8080/allbooks
router.get('/allbooks',validator.generateValidationMiddleware(queryForAuthor,'query'),bookController.handleGet);
router.post('/allbooks',bookController.storeData)
router.get('/allbooks/:id',validator.generateValidationMiddleware(paramBookById,'params'),bookController.getOneBook)
router.patch('/allbooks/:id',validator.generateValidationMiddleware(paramBookById,'params'),validator.generateValidationMiddleware(patchIsLiked,'body'),bookController.updateLike)
router.get('/allbooks',bookController.sortBook)
// router.get('/allbooks?:author',bookController.getBooksFromAuthor)

// router.get('/author', bookController.grouByAuthor);
// router.use(handleErrors)
module.exports =   router;
