const mongoose = require('mongoose');
mongoose.connect('!!')
.then(()=>{
    console.log('connect to db');
})
.catch(()=>{
    console.log(err);
})