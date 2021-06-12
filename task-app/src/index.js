const express = require('express');
require("./db/mongoose.js");
const RouteUser = require("./routers/users.js");
const RouteTask = require("./routers/tasks.js");
const multer = require("multer");


const app = express();
const port = process.env.PORT || 3000;

const upload = multer({
    dest: 'images'
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
});

app.post('/users/me/avatar', upload.single('upload'), (req, res) => {
    res.send();
})

app.use(express.json());

app.use(RouteUser);    
app.use(RouteTask);    


app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
