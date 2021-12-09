const express = require('express');
const router = express.Router();
const passport = require("../config/ppConfig");

const { Exercise } = require('../models');
const { Workout } = require('../models');

router.get('/:id', function (req, res) {
    let workoutId = Number(req.params.id)
    Exercise.findAll({
        where:{ workoutId:workoutId }
    })  //===> name of model you want to select 
        .then(function (exerciseList) {
            console.log('FOUND ALL exercise', exerciseList);
            res.render('exercises/index', { workoutId:workoutId, exercises: exerciseList });
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again...' });
        });
});


//==================== EXAMPLE: GET:- New (Create form for user to add new Exercise)====\\

router.get('/new/:id', function (req, res) {
    let workoutId = Number(req.params.id);
    console.log('IS THIS A NUMBER',workoutId);
    res.render('exercises/new',{workoutId:workoutId});
});
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
                res.render('404', {message:'Exercise does not exist'}) //makes 404 error page
            }
        })
        .catch(function (err) {
            console.log('ERROR', err)
        })


})
//========================== END of EXAMPLE ===================\\


//=================== EXAMPLE: GET- SHOW (Find and Display 1 Exercise on page) !!!MUST BE AT THE END OF EXERCISE GETS!!===========\\
router.get('/s/:id', function (req, res) {
    console.log('BODY', req.params);
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
            res.render('404', {message:'Exercise does not exist'})

        })

})
//========================== END of EXAMPLE ===================\\


//==================== EXAMPLE: POST:- New (Create form for user to add new Exercise)====\\
router.post('/:id', function (req, res) {
    console.log('SUBMITTED FORM', req.body);
    let workoutId = Number(req.params.id)
    Workout.findOne({
        where:{id:workoutId}
    })
    .then(Workout => {
        Workout.createExercise({
        name: req.body.name,
        weight: Number(req.body.weight),
        reps: Number(req.body.reps),
        sets: Number(req.body.sets),
        bodyGroup: req.body.bodyGroup,
        userId: req.user.get().id,
    })
        .then(function (newExercise) {
            console.log('NEW EXERCISE', newExercise.toJSON());
            newExercise = newExercise.toJSON();
            res.redirect(`/exercises/s/${newExercise.id}`);
        })
        .catch(function (err) {
            console.log('ERROR', err);
        })
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
            res.redirect(`/exercises/s/${exerciseIndex}`);
        })
        .catch(function (err) {
            console.log('ERROR', err)
        })
})

//========================== END of EXAMPLE ===================\\



module.exports = router;