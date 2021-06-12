const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./tasks');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
         if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
         }
        }
    },
    password: { 
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value){
           if (value.toLowerCase().includes('password')) {
               throw new Error("Password is too common!");
           }
        } 
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) {
              throw new Error('Age must be a positive number');
          }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }

    }]
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

// Delete task when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.methods.toJSON = function() {
    const user = this;

    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.tokens;

    return userObj;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString() }, 'thisthismynewcourse');

    user.tokens = user.tokens.concat({ token });
    await user.save();
    
    return token;
}

userSchema.pre('save', async function(next) {
    const user = this;
     
    if(user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
