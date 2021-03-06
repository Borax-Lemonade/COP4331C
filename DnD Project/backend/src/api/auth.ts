import { Router } from "express";
import { verify } from "jsonwebtoken";
import User from "../models/User";
import { sendRefreshToken, createAccessToken, createRefreshToken } from "../utils/TokenAuth";
import { compare, genSalt, hash } from "bcrypt";
import sendgrid from "@sendgrid/mail";

const router = Router();

const app_name = "cop4331-dnd";
const baseURL =
  process.env.NODE_ENV === "production"
    ? `https://${app_name}.herokuapp.com`
    : `http://localhost:3000`;

router.get("/refreshToken", async (req, res) => {
	const { refreshToken } = req.cookies;
	let payload = null;

	if (!refreshToken) {
		return res.status(401).json({
			message: "No refresh token provided"
		});
	}

	try {
		payload = verify(refreshToken, process.env.REFRESH_TOKEN!);
	} catch (err) {
		console.error(err);
		return res.status(401).json({ accessToken: "", error: "Error with verifying payload" });
	}

	const { username } = payload as any; // change any to payload shape

	if (!username) {
		return res.status(401).json({ accessToken: "", error: "No username in payload" });
	}

	const user = await User.findOne({ username }).exec();

	if (!user) {
		return res.status(401).json({ accessToken: "", error: "No user found" });
	}

	sendRefreshToken(res, createRefreshToken(user));

	res.json({
		accessToken: createAccessToken(user)
	});
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ error: "User info not provided" });
	}

	let data = await User.findOne({ username: username }).exec();

	if (!data) {
		data = await User.findOne({ email: username }).exec();
		if (!data) {
			return res.status(400).json({ error: "Incorrect login info" });
		}
	}

	const validPassword = await compare(password, data.password);
	
	const msg = {
		to: data.email,
		from: 'group25DemoGod@gmail.com',
		subject: 'Verfication email',
		text: 'https://cop4331-dnd.herokuapp.com/dashboard/verify',
		html: `
		<div>
			<h1>Welcome to <strong>DnD 25</strong></h1>
			<h4>Click this link <a href='${baseURL}/verify/${data.username}'>here</a> to verify yourself!</h4>
		</div>`,
	  }

	if (!validPassword) {
		return res.status(400).json({ error: "Incorrect login info" });
	}

	if (!data.verified) {
		sendgrid.send(msg);
	 	return res.status(400).json({ error: "E-mail not verified" });
	}

	sendRefreshToken(res, createRefreshToken(data));

	res.status(200).json({
		data,
		accessToken: createAccessToken(data)
	});
});

router.post("/signup", async (req, res) => {
	const { username, password, firstName, lastName, email, verified } = req.body;
	if (!username || !password || !email) {
		return res.status(400).json({ error: "Sign up info not provided" });
	}

	let data = await User.findOne({ username }).exec();

	if (data) {
		return res.status(400).json({ error: "Username already exists" });
	}

	data = await User.findOne({ email }).exec();

	if (data) {
		return res.status(400).json({ error: "Email belongs to an existing account" });
	}

	const salt = await genSalt(12);
	const hashedPassword: string = await hash(password, salt);

	let user = new User({
		username,
		password: hashedPassword,
		firstName: firstName ?? "",
		lastName: lastName ?? "",
		email,
		verified: verified ?? false
	});
	
	const msg = {
		to: email,
		from: 'group25DemoGod@gmail.com',
		subject: 'Verfication email',
		text: 'https://cop4331-dnd.herokuapp.com/dashboard/verify',
		html: `
		<div>
			<h1>Welcome to <strong>DnD 25</strong></h1>
			<h4>Click this link <a href='${baseURL}/verify/${user.username}'>here</a> to verify yourself!</h4>
		</div>`,
	}

	sendgrid.send(msg);

	await user.save();

	sendRefreshToken(res, createRefreshToken(user));
	res.status(200).json({
		user,
		accessToken: createAccessToken(user)
	});
});

router.post("/logout", async (req, res) => {
	sendRefreshToken(res, "");
	res.status(200).json({});
});

router.get("/getUserId", async (req, res) => {
	const { email } = req.query;

	if (!email) {
		return res.status(400).json({ error: "No e-mail provided" });
	}

	let data = await User.findOne({ email: email }).exec();

	if (!data) {
		return res.status(400).json({ error: "E-mail does not exist" });
	}

	sendRefreshToken(res, createRefreshToken(data));

	return res.status(200).json({
		data,
		accessToken: createAccessToken(data)
	});
});

router.post("/verifyUser", async (req,res) => {
    const { username } = req.body;

    const filter = { username };
    const update = { verified: true };

    let data = User.findOneAndUpdate(filter, update).exec();

    if (!data) {
			return res.status(400).json({ error: "User does not exist" });
    }

		res.status(200).json({ message: "Verified!" });
});

// NEEDS ADJUSTING
// I'm unsure how we plan to route the frontend password reset but here's the basic framework needed
router.post("/forgotPassword", async (req,res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ error: "User info not provided" });
	}
	
	let data = await User.findOne({ email : email }).exec();
	
	if (!data) {
		return res.status(400).json({error: "User does not exist"});
	}

	const msg = {
		to: email,
		from: 'group25DemoGod@gmail.com',
		subject: 'Reset password email',
		text: 'https://cop4331-dnd.herokuapp.com/dashboard/resetPassword',
		html: `
		<div>
			<h1><strong>DnD 25</strong> password reset</h1>
			<h4>Click this link <a href='${baseURL}/resetPassword/${data.email}'>here</a> to reset your password.</h4>
		</div>`,
	}

	try {
		sendgrid.send(msg);
		return res.status(200).json({ message: "E-mail sent" });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ error: "Error sending E-mail" });
	}
});

router.post("/resetPassword", async (req,res) => {
    const { password, email } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password not provided" });
    }

    const salt = await genSalt(12);
    const hashedPassword: string = await hash(password, salt);
    const filter = { email: email };
    const update = { password: hashedPassword };

    User.findOneAndUpdate(filter, update).exec();

    res.status(200).json({ message: "Password updated" });
});

export default router;
