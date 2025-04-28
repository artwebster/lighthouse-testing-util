import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './env.js';
import { Express } from 'express';

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID!,
			clientSecret: GOOGLE_CLIENT_SECRET!,
			callbackURL: '/auth/google/callback',
			scope: ['profile']
		},
		(accessToken: string, refreshToken: string, profile?: any, done?: any) => {
			done(null, profile); // just passing the profile for now, will possibly connect to db later
		}

		// (accessToken: string, refreshToken: string, profile?: any, done?: any) => {
		// 	db.get(
		// 		"SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
		// 		[issuer, profile.id],
		// 		function (err: Error | null, row: any) {
		// 			if (err) {
		// 				return cb(err);
		// 			}
		// 			if (!row) {
		// 				db.run(
		// 					"INSERT INTO users (name) VALUES (?)",
		// 					[profile.displayName],
		// 					function (err: Error | null) {
		// 						if (err) {
		// 							return cb(err);
		// 						}

		// 						var id = this.lastID;
		// 						db.run(
		// 							"INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
		// 							[id, issuer, profile.id],
		// 							function (err: Error | null) {
		// 								if (err) {
		// 									return cb(err);
		// 								}
		// 								var user = {
		// 									id: id,
		// 									name: profile.displayName,
		// 								};
		// 								return cb(null, user);
		// 							}
		// 						);
		// 					}
		// 				);
		// 			} else {
		// 				db.get(
		// 					"SELECT * FROM users WHERE id = ?",
		// 					[row.user_id],
		// 					function (err: Error | null, row: any) {
		// 						if (err) {
		// 							return cb(err);
		// 						}
		// 						if (!row) {
		// 							return cb(null, false);
		// 						}
		// 						return cb(null, row);
		// 					}
		// 				);
		// 			}
		// 		}
		// 	);
		// }
	)
);

passport.serializeUser((user: Express.User, done) => {
	done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
	done(null, user);
});
