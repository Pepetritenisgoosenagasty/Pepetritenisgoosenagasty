const express = require("express");
const Task = require("../models/tasks.js");
const auth = require("../middleware/auth.js");
const router = new express.Router();

router.get('/tasks', auth, async (req, res) => {
    try {
      const task = await Task.find({ owner: req.user._id });
      // await req.user.populate('task').execPopulate();
      res.send(req.user.task);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id;
    
    try {
      const task = await Task.findOne({ _id, owner: req.user._id});
      if(!task) {
        res.status(404).send();
      }
      res.send(task);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
      ...req.body,
      owner: req.user._id
    });
  
    try {
      await task.save();
      res.status(201).send(task);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
  router.patch('/tasks/:id', async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdate = ["description", "completed"];
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update));
    
    if(!isValidOperation){
      return res.status(400).send({ error: 'Invalid updates!'});
    }
  
    try {
      // const task = await Task.findByIdAndUpdate(req.params.id,req.body, {
      //   new: true, runValidators: true
      // });

      const task = await Task.findOne({ _id: req.param.id, owner: req.user._id});

     updates.forEach((update) => task[update] = req.body[update]);
     await task.save();
  
      if(!task) {
        res.status(404).send();
      }
      res.send(task);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
  
  router.delete('/tasks/:id', auth, async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
      if(!task) {
        res.status(404).send();
      }
      res.send(task);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  module.exports = router;