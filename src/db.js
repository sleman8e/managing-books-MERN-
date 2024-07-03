const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sleman:1234@sleman.zh0e25o.mongodb.net/Book_Hub?appName=Sleman')
.then(()=>{
    console.log('connect to db');
})
.catch(()=>{
    console.log(err);
})