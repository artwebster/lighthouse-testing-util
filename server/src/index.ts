import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { PORT, SESSION_SECRET } from './config/env.js';
import { initializeDatabase } from './config/database.js';
import router from './routes/index.js';
import './config/passport.js';

const app = express();

await initializeDatabase();

app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});

export { app };
