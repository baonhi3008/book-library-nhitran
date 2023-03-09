// const { Router } = require('express')

// const bookRouter  = require('./api/books')

// const router = Router()

// router.use('/books', bookRouter)

// module.exports = router
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;