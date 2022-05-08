import 'dotenv/config';
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
	dialect: "mysql",
	host: process.env.HOST_ADDRESS,
	logging: false,
});

var firstStart = {};
if (process.argv[2] == "format-db") {
	firstStart = { force: true };
}

const Board = sequelize.define("board", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	author: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	image: {
		type: Sequelize.STRING,
		allowNull: true,
	},
});

const Message = sequelize.define("message", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	author: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	message: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	image: {
		type: Sequelize.STRING,
		allowNull: true,
	},
});

Board.hasMany(Message);

sequelize
	.sync(firstStart)
	.then(() => {})
	.catch((err) => {
		return console.log(err);
	});

process.addListener("exit", function () {
	sequelize.close();
});

export default class {
	static findAllBoards(callback) {
		Board.findAll({ raw: true })
			.then((data) => {
				callback(data);
			})
			.catch((err) => {
				console.log(err);
				callback(false);
			});
	}

	static createBoard(name, author, image,callback) {
		Board.create({
			name: name,
			author: author,
			image: image,
		}).catch((err) => {
			console.log(err);
			callback(false);
		});
		callback(true);
	}

	static findMessage(id, callback) {
		let boardId = parseInt(id);

		Message.findAll({
			where: {
				boardId: boardId,
			},
			raw: true,
		})
			.then((data) => {
				callback(data);
			})
			.catch((err) => {
				console.log(err);
				callback(false);
			});
	}

	static createMessage(author, message, image, boardId, callback) {
		Message.create({
			author: author,
			message: message,
			image: image,
			boardId: boardId
		}).catch((err) => {
			console.log(err);
			callback(false);
		});
		callback(true);
	}

	static getBoardsCount(callback) {
		Board.findAndCountAll()
			.then((data) => {
				callback(data);
			})
			.catch((err) => {
				console.log(err);
				callback(false);
			});
	}

	static getMessagesCount(callback) {
		Message.findAndCountAll()
			.then((data) => {
				callback(data);
			})
			.catch((err) => {
				console.log(err);
				callback(false);
			});
	}
}
