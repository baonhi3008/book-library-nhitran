const express = require('express');

const bookController = require('../../controllers/books');
const {handleErrors} = require('../../middleware/errorHandler.middleware')
const router = express.Router();

// GET localhost:8080/allbooks
router.get('/allbooks', bookController.handleResquest);
// router.get('/author', bookController.grouByAuthor);
// router.use(handleErrors)
module.exports =   router;
