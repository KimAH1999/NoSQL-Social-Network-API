//imports
const router = require('express').Router();

const {
    GetAllThoughts,
    GetThoughtById,
    CreateThought,
    DeleteThought,
    CreateReaction,
    UpdateThought,
    DeleteReaction
} = require('../../controllers/thoughtController')

//router to type for each section
router
    .route('/')
    .get(GetAllThoughts)
router 
    .route('/:userId')
    .post(CreateThought)
router
    .route('/:thoughtId')
    .get(GetThoughtById)
    .put(UpdateThought)
    .delete(DeleteThought)
router
    .route('/:thoughtId/reactions')
    .post(CreateReaction)
router
    .route('/:thoughtId/:reactionId')
    .delete(DeleteReaction);


//export
module.exports = router;