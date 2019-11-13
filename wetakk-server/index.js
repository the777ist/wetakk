const db = require("./models");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/auth", authRoutes);

app.use("/api/users/:id/messages", 
	loginRequired,
	ensureCorrectUser,
	messagesRoutes
);

app.use("/api/messages",
	loginRequired,
	async function(req, res, next) {
		try {
			let messages = await db.Message.find()
				.sort({createdAt: "desc"})
				.populate("user", {
					username: true,
					profileImageUrl: true
				});

			return res.status(200).json(messages);	
		} catch(err) {
			return next(err);
		}
	}
);

// 404 eror handler
app.use(function(req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// generic error handler from handlers/error.js
app.use(errorHandler);

app.listen(PORT, function() {
	console.log(`WETAKK Server has started on port ${PORT}`);
});