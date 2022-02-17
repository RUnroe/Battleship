const dal = {};
const configure = (obj) => {
	Object.assign(dal, obj.dal);

};

const { requireNotAuth, handle } = require('../util');

const homePage = (req, res) => {
	res.render("homePage", {});

}

const signUpPage = (req, res) => {
	res.render("signUpPage", {});

}

const logInPage = (req, res) => {
	res.render("logInPage", {});

}

const findGamePage = (req, res) => {
	res.render("findGamePage", {});

}

const gamePage = (req, res) => {
	res.render("gamePage", {});

}




const routes = [
	{
		uri: '/',
		methods: ['get'],
		handler: [homePage]
	},
    {
		uri: '/signup',
		methods: ['get'],
		handler: [requireNotAuth(), signUpPage]
	},
	{
		uri: '/login',
		methods: ['get'],
		handler: [requireNotAuth(), logInPage]
	},
    {
		uri: '/find',
		methods: ['get'],
		handler: [findGamePage]
	},
    {
		uri: '/game/:game_id',
		methods: ['get'],
		handler: [gamePage]
	},
];


module.exports = { routes, configure };
