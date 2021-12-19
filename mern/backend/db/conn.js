let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/trainning',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false
    })
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err))