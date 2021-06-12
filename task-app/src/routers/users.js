const express = require('express');
const User = require("../models/users.js");
const auth = require("../middleware/auth.js");

const router = new express.Router();

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token});
  } catch (e) {
    res.status(400).send(e);
  }
}); 

router.post('/users/logout', auth, async (req, res) => {
   try {
     req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
     });

     await req.user.save();

     res.send();
   } catch (e) {
     req.status(500).send();
     
   }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body);
 
   try {
     await user.save();
     const token = await user.generateAuthToken();
     res.status(201).send({user, token});
   } catch (e) {
     res.status(400).send(e);
   }
 });
 
 router.get('/users', auth, async (req,res) => {
   try {
     const users = await User.find({});
     res.send(users);
   } catch (e) {
     res.status(500).send();
   }
 });


 
 router.get('/users/:id', async (req,res) => {
   const _id = req.params.id;
 
   try {
     const user = await User.findById(_id)
     if(!user) {
       return res.status(404).send();
     }
 
     res.send();
   } catch (e) {
     res.status(500).send(e);
   }
 });

 router.get('/users/me', auth, async (req,res) => {
  await  res.send(req.user);
 });
 
 router.patch('/users/me', auth,async (req,res) => {
   const updates = Object.keys(req.body);
   const allowedUpdate = ["name", "email", "password", "age"];
   const isValidOperation = updates.every((update) => allowedUpdate.includes(update));
   
   if(!isValidOperation){
     return res.status(400).send({ error: 'Invalid updates!'});
   }
 
   try {
    //  const user = await User.findByIdAndUpdate(req.params.id,req.body, {
    //    new: true, runValidators: true
    //  });
      
     

     updates.forEach((update) => req.user[update] = req.body[update]);
     await req.user.save();
     
     res.send(req.user);
   } catch (e) {
     res.status(400).send(e);
   }
 });
 
 router.delete('/users/me', auth, async (req, res) => {
       try {
          await req.user.remove();
         res.send(req.user); 
       } catch (e) {
         res.status(500).send(e);
       }
 })
 

module.exports = router;