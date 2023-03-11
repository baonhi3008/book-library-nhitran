const joi = require('joi');


module.exports = {
  patchIsLiked: joi.object({
    isLiked: joi.boolean().required(),
  }),
  paramBookById: joi.object({
    id: joi.number().integer().positive().optional(),
  }),
  queryForAuthor: joi.object({
    author: joi.string().optional(),
  }),
};