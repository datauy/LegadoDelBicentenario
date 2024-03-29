;(function (passport, passportFacebook, controller)
{
  'use strict';

  var FacebookStrategy = passportFacebook.Strategy;

	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.  However, since this example does not
	//   have a database of user records, the complete Facebook profile is serialized
	//   and deserialized.
	passport.serializeUser(function (user, done)
	{
		done(null, user);
	});

	passport.deserializeUser(function (obj, done)
	{
		done(null, obj);
	});

	// Use the FacebookStrategy within Passport.
	//   Strategies in Passport require a `verify` function, which accept
	//   credentials (in this case, an accessToken, refreshToken, and Facebook
	//   profile), and invoke a callback with a user object.
	passport.use(new FacebookStrategy(
		{
			clientID: 144441392317207
		,	clientSecret: 'a82599dde1be3f8ad3986d203125e9f3'
		,	callbackURL: '/legado/auth/facebook/callback'
		,	profileFields: ['first_name', 'gender', 'birthday', 'relationship_status', 'location']
		}
	,	function (accessToken, refreshToken, profile, done)
		{
			// asynchronous verification, for effect...
			process.nextTick(function ()
			{
				// To keep the example simple, the user's Facebook profile is returned to
				// represent the logged-in user. In a typical application, you would want
				// to associate the Facebook account with a user record in your database,
				// and return that user instead.
				return done(null, profile);
			});
		}
	));

	var app = module.exports = controller();

	app.use(passport.initialize());
	app.use(passport.session());

	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope: ['user_relationships', 'user_birthday', 'user_location']
	,	display: 'touch'
	}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/'
	,	successRedirect: '/ingresar'
	}));

}(require('passport'), require('passport-facebook'), require(__dirname + '/../../lib/controller.js')));
