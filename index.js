import moment from "moment";		//helpers
import chalk from "chalk";

import cookieParser from "cookie-parser";		//Cookie etc
import session from "express-session";		
import flash from "connect-flash";

import express from "express";		//express
const app = express();

import BoardsController from "./src/Controllers/BoardsController.js";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.locals.moment = moment;
const jsonParser = express.json();

app.use(
	session({
		cookie: { maxAge: 1000000 },
		resave: true,
		saveUninitialized: true,
		secret: "Secret",
	})
);
app.use(cookieParser("Secret"));
app.use(flash());


app.get("/", (req, res) => {
	let error = req.flash("error");
	if (error.length == 0) error = false;
	res.render("index.pug", {
		error: error,
	});
});

app.get("/boards", (req, res) => {
	const nickname = req.cookies.nickname;

	try {
		BoardsController.findAllBoards((data) => {
			if (data) {
				res.render("allBoards.pug", {
					boards: data,
					nickname: nickname,
				});
			} else {
				throw "Ошибка сервера";
			}
		});
	} catch (err) {
		req.flash("error", err);
		res.redirect("/");
	}
});

app.get("/board/:id", (req, res) => {
	const boardId = req.params.id;

	try {
		if (!boardId) {
			throw "Ошибка";
		}

		BoardsController.findMessage(boardId, function (messages) {
			if (messages) {
				res.render("board.pug", {
					messages: messages,
					boardId: boardId,
					nickname: req.cookies.nickname,
				});
			} else {
				throw "Такой доски не существует";
			}
		});
	} catch (err) {
		req.flash("error", err);
		res.redirect("/");
	}
});

app.post("/board", jsonParser, (req, res) => {
	const name = req.body.name;
	const author = req.cookies.nickname;

	try {
		if (name.length == 0 || author.length == 0) throw "Неверно заполнены данные";

		BoardsController.createBoard(name, author, (status) => {
			if (status) {
				res.redirect("/boards");
			} else {
				throw "Ошибка сервера";
			}
		});
	} catch (err) {
		req.flash("error", err);
		res.redirect("/");
	}
});

app.post("/message", jsonParser, (req, res) => {
	const message = req.body.message;
	const author = req.cookies.nickname;
	const boardId = req.body.boardId;

	try {
		if (message.length == 0 || author.length == 0 || boardId.length == 0) {
			throw "Неверно заполнена форма";
		}

		BoardsController.createMessage(author, message, boardId, (status) => {
			if (status) {
				res.redirect("/board/" + boardId);
			} else {
				throw "Ошибка сервера или доски не существует";
			}
		});
	} catch (err) {
		req.flash("error", err);
		res.redirect("/");
	}
});

app.get("/stats", (req, res) => {
	try {
		BoardsController.getBoardsCount((boardsCount) => {
			if (!boardsCount) {
				throw "Ошибка сервера";
			}
			BoardsController.getMessagesCount((messagesCount) => {
				if (!messagesCount) {
					throw "Ошибка сервера";
				}
				res.render("stats.pug", {
					nickname: req.cookies.nickname,
					boardsCount: boardsCount.count,
					messagesCount: messagesCount.count,
				});
			});
		});
	} catch (err) {
		req.flash("error", err);
		res.redirect("/");
	}
});

app.get("/nickname", (req, res) => {
	res.render("nickname.pug", {
		nickname: req.cookies.nickname,
	});
});

app.post("/nickname", jsonParser, (req, res) => {
	const nickname = req.body.nickname;
	res.cookie("nickname", nickname);
	res.redirect("/nickname");
});

app.listen("3000", "127.0.0.1", () => {
	console.log(chalk.yellow("Server Has Started at 127.0.0.1:3000"));
});
