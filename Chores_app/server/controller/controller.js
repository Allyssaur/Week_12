const { request } = require('express');
var Taskdb = require('../model/model');

//create and save new task
exports.create = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    //New Task
    const task = new Taskdb({
        task: req.body.task,
        // email: req.body.email,
        difficulty: req.body.difficulty,
        status: req.body.status

    })

    //Saves Task in DB
    task
        .save(task)
        .then(data => {
            res.redirect('/add-task');
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error has occurred during operation creation."
            })
        })
}

//retrieve and return all tasks/ retrieve and return single task
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Taskdb.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({ message: "Task not found!"})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving task with id" + id})
            })

    } else {
        Taskdb.find()
            .then(task => {
                res.send(task)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving task information"})
            })
    }
}

// //Update a new identifed task by task Id
exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({ message:"Data to update cannot be empty"})
    }

    const id = req.params.id;
    Taskdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot update task with ${id}.  Maybe task was not found!`})
            } else {
                res.send(data)
            }
        })
}

//Delete a Task with specified task Id in request
exports.delete = (req, res) => {
    const id = req.params.id;

    Taskdb.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}.`})
            } else {
                res.send({
                    message: "Task was deleted sucessfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
}