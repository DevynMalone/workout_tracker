const express = require('express');
const router = express.Router();
const passport = require("../config/ppConfig");

const { Exercise } = require('../models');

router.get('/', function (req, res) {
    Exercise.findAll()  //===> name of model you want to select 
        .then(function (exerciseList) {
            console.log('FOUND ALL exercise', exerciseList);
            res.render('exercises/index', { exercises: exerciseList });
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again...' });
        });
});


//==================== EXAMPLE: GET:- New (Create form for user to add new Exercise)====\\

router.get('/new', function (req, res) {
    res.render('exercises/new')
})
//========================== END of EXAMPLE ===================\\

//=================== EXAMPLE: GET- EDIT (Edit Current Exercise in Table)===========\\
router.get('/edit/:id', function (req, res) {
    let exerciseIndex = Number(req.params.id);
    Exercise.findByPk(exerciseIndex)
        .then(function (exercise) {
            if (exercise) {
                exercise = exercise.toJSON(); // check in term to make sure object comes back
                res.render('exercises/edit', { exercise });
            } else {
                console.log('This exercise does not exist');  // render a 404 page
                // res.render('404', {message:'Exercise does not exist'}) //makes 404 error page
            }
        })
        .catch(function (err) {
            console.log('ERROR', err)
        })


})
//========================== END of EXAMPLE ===================\\


//=================== EXAMPLE: GET- SHOW (Find and Display 1 Exercise on page) !!!MUST BE AT THE END OF EXERCISE GETS!!===========\\
router.get('/:id', function (req, res) {
    console.log('PARAMS', req.params);
    let exerciseIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', exerciseIndex)
    Exercise.findByPk(exerciseIndex)
        .then(function (exercise) {
            if (exercise) {
                exercise = exercise.toJSON();
                console.log('IS THIS A VALID EXERCISE', exercise);
                res.render('exercises/show', { exercise });
            } else {
                console.log('This exercise does not exist');
            }

        })
        .catch(function (err) {
            console.log('ERROR', err)
        })

})
//========================== END of EXAMPLE ===================\\


//==================== EXAMPLE: POST:- New (Create form for user to add new Exercise)====\\
router.post('/', function (req, res) {
    console.log('SUBMITTED FORM', req.body);
    Exercise.create({
        name: req.body.name,
        weight: Number(req.body.weight),
        reps: Number(req.body.reps),
        sets: Number(req.body.sets),
        bodyGroup: req.body.bodyGroup
    })
        .then(function (newExercise) {
            console.log('NEW EXERCISE', newExercise.toJSON());
            newExercise = newExercise.toJSON();
            res.redirect(`/exercises/${newExercise.id}`);
        })
        .catch(function (err) {
            console.log('ERROR', err);
        })
})


//========================== END of EXAMPLE ===================\\

//=================== EXAMPLE: DELETE- DELETE (delete Current Exercise in Table)===========\\
router.delete('/:id', function (req, res) {
    console.log('ID HERE', req.params.id);
    let exerciseIndex = Number(req.params.id);
    Exercise.destroy({ where: { id: exerciseIndex } })
        .then(function (response) {
            console.log('EXERCISE DELETED', response)
            res.redirect('/exercises');
        })
        .catch(function (err) {
            console.log('ERROR', err)
            res.render('404', { message: 'Exercise was not deleted, please try again' })
        })
});

//========================== END of EXAMPLE ===================\\


//=================== EXAMPLE: PUT- EDIT (Edit Current Exercise in Table)===========\\
router.put('/:id', function (req, res) {
    console.log('EDIT FROM DATA THAT WAS SUBMITTED', req.body);
    console.log('THIS IS THE ID', req.params.id);
    let exerciseIndex = Number(req.params.id)
    Exercise.update({
        name: req.body.name,
        weight: Number(req.body.weight),
        reps: Number(req.body.reps),
        sets: Number(req.body.sets),
        bodyGroup: req.body.bodyGroup
    }, { where: { id: exerciseIndex } })
        .then(function (response) {
            console.log('AFTER UPDATE', response);
            res.redirect(`/exercises/${exerciseIndex}`);
        })
        .catch(function (err) {
            console.log('ERROR', err)
        })
})

//========================== END of EXAMPLE ===================\\



module.exports = router;