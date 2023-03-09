const router = require('express').Router();
const { handleErrors } = require('../../middlewares/errorHandler');
const bookRouter = require('./books');

router.use('/allbooks', bookRouter);

router.use(handleErrors);

module.exports = router;