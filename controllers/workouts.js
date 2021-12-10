const express = require('express');
const router = express.Router();
const passport = require("../config/ppConfig");

const { Workout } = require('../models');

router.get('/', function (req, res) {
    console.log(req.user.get().id)
    Workout.findAll({
       where: {userId:req.user.get().id}
    }) //===> name of model you want to select 
        .then(function (workoutList) {
            console.log('FOUND ALL workout', workoutList);
            res.render('workouts/index', { workouts: workoutList });
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again...' });
        });
});


//==================== EXAMPLE: GET:- New (Create form for user to add new workout)====\\

router.get('/new', function (req, res) {
    res.render('workouts/new')
})
//========================== END of EXAMPLE ===================\\

//=================== EXAMPLE: GET- EDIT (Edit Current workout in Table)===========\\
router.get('/edit/:id', function (req, res) {
    let workoutIndex = Number(req.params.id);
    Workout.findByPk(workoutIndex)
        .then(function (workout) {
            if (workout) {
                workout = workout.toJSON(); // check in term to make sure object comes back
                res.render('workouts/edit', { workout });
            } else {
                console.log('This workout does not exist');  // render a 404 page
                // res.render('404', {message:'workout does not exist'}) //makes 404 error page
            }
        })
        .catch(function (err) {
            console.log('ERROR', err)
        })


})
//========================== END of EXAMPLE ===================\\


//=================== EXAMPLE: GET- SHOW (Find and Display 1 Workout on page) !!!MUST BE AT THE END OF WORKOUT GETS!!===========\\
router.get('/:id', function (req, res) {
    console.log('PARAMS', req.params);
    let workoutIndex = Number(req.params.id);
    console.log('IS THIS A NUMBER?', workoutIndex)
    Workout.findByPk(workoutIndex)
        .then(function (workout) {
            if (workout) {
                workout = workout.toJSON();
                console.log('IS THIS A VALID WORKOUT', workout);
                res.render('workouts/show', { workout });
            } else {
                console.log('This workout does not exist');
            }

        })
        .catch(function (err) {
            console.log('ERROR', err)
        })

})
//========================== END of EXAMPLE ===================\\


//==================== EXAMPLE: POST:- New (Create form for user to add new Workout)====\\
router.post('/', function (req, res) {
    console.log('SUBMITTED FORM', req.body);
    // console.log('CURRENT USER', req.user.get()) <== example of req.user.get()
    Workout.create({
        day: req.body.day,
        duration: Number(req.body.duration),
        userId: req.user.get().id
    })
        .then(function (newWorkout) {
            console.log('NEW WORKOUT', newWorkout.toJSON());
            newWorkout = newWorkout.toJSON();
            res.redirect(`/workouts/${newWorkout.id}`);
        })
        .catch(function (err) {
            console.log('ERROR', err);
        })
})


//========================== END of EXAMPLE ===================\\

//=================== EXAMPLE: DELETE- DELETE (delete Current workout in Table)===========\\
router.delete('/:id', function (req, res) {
    console.log('ID HERE', req.params.id);
    let workoutIndex = Number(req.params.id);
    Workout.destroy({ where: { id: workoutIndex } })
        .then(function (response) {
            console.log('WORKOUT DELETED', response)
            res.redirect('/workouts');
        })
        .catch(function (err) {
            console.log('ERROR', err)
            res.render('404', { message: 'Workout was not deleted, please try again' })
        })
});

//========================== END of EXAMPLE ===================\\


//=================== EXAMPLE: PUT- EDIT (Edit Current Workout in Table)===========\\
router.put('/:id', function (req, res) {
    console.log('EDIT FROM DATA THAT WAS SUBMITTED', req.body);
    console.log('THIS IS THE ID', req.params.id);
    let workoutIndex = Number(req.params.id)
    Workout.update({
        day: req.body.day,
        duration: Number(req.body.duration),
        userId: req.user.get().id
    }, { where: { id: workoutIndex } })
        .then(function (response) {
            console.log('AFTER UPDATE', response);
            res.redirect(`/workouts/${workoutIndex}`);
        })
        .catch(function (err) {
            console.log('ERROR', err)
        })
})

//========================== END of EXAMPLE ===================\\



module.exports = router;