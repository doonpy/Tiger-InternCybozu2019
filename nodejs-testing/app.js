const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect with mongoDB Atlas
const connectionString = 'mongodb+srv://tiger:tiger@pokebiz-exjmn.azure.mongodb.net/tdddemo?retryWrites=true&w=majority';
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log(`Connected to MongoDB Atlas.`);
}).catch(err => {
    console.log(`Failed to connect to MongoDB Atlas... ${err}`);
    process.exit();
});

const userRouter = require('./routes/user.route');

app.use('/api/users', userRouter);

app.use((req, res, next) => {
    next(createError(404));
});

//error handle
app.use((req, res, next) => {
    //set locals, only providing error in development
    res.locals.message = err.message;

    //render error page
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;