import { Router } from "express";
import User from "../models/User";
import checkAuth from "../utils/CheckAuth";
import { compare, genSalt, hash } from "bcrypt";

const router = Router();

router.use(checkAuth);

router.post("/changePassword", async (req, res) => {
	const { password, newPassword } = req.body;
	const { _id: userId } = res.locals;

    if (!userId) {
		return res.status(400).json({ error: "No user provided" });
	}

    if (!password || !newPassword) {
        return res.status(400).json({ error: "No password provided "});
    }

    let data = await User.findOne({ _id: userId }).exec();

    if (data) {
        const validPassword = await compare(password, data.password);

        if (!validPassword) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        const salt = await genSalt(12);
        const hashedPassword: string = await hash(newPassword, salt);
        const filter = { _id: userId, password: data.password };
        const update = { password: hashedPassword };

        data = await User.findOneAndUpdate(filter, update).exec();
        
        if (!data) {
            return res.status(400).json({ error: "Incorrect password" });
        } 
        
        return res.status(200).json({ message: "Password updated" });
    } else { 
        return res.status(400).json({ error: "User does not exist" });
    }
});

router.post("/changeName", async (req, res) => {
    const { firstName, lastName } = req.body;
    const { _id: userId } = res.locals;

    if (!userId) {
        return res.status(400).json({ error: "No user provided" });
    }
    if (!firstName || !lastName) {
        return res.status(400).json({ error: "First/Last name not provided" });
    }

    const filter = { _id: userId };
    const update = { firstName: firstName, lastName: lastName };

    User.findOneAndUpdate(filter, update).exec();

    return res.status(200).json({ message: "User info updated" });
});

router.post("/resetPassword", async (req,res) => {
    const { _id: userId } = res.locals;
    const { password } = req.body;

    if (!userId || !password) {
        return res.status(400).json({ error: "User info not provided" });
    }

    const salt = await genSalt(12);
    const hashedPassword: string = await hash(password, salt);
    const filter = { _id: userId };
    const update = { password: hashedPassword };

    User.findOneAndUpdate(filter, update).exec();

    return res.status(200).json({ message: "Password updated" });
});

export default router