const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const galleryRouter = require('./routes/gallery.router');
const galleriesRouter = require('./routes/galleries.router');
const imageRouter = require('./routes/image.router');
const gameRouter = require('./routes/game.router');
const classesRouter = require('./routes/classes.router');



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/galleries', galleriesRouter);
app.use('/api/image', imageRouter);
app.use('/api/game', gameRouter);
app.use('/api/classes', classesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
