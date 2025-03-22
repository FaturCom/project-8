const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new db.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const usermodel = db.model("users", userSchema);
usermodel.createIndexes({ username: 1 }, { unique: true });

// Route untuk registrasi user
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!validator.isAlphanumeric(username)) {
            return res.status(400).send("❌ Username hanya boleh huruf dan angka!");
        }

        if (!validator.isLength(username, { min: 3 })) {
            return res.status(400).send("❌ Username minimal 3 karakter!");
        }

        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).send("❌ Password minimal 6 karakter!");
        }

        if (!validator.isStrongPassword(password, { minNumbers: 1, minUppercase: 1, minSymbols: 1 })) {
            return res.status(400).send("❌ Password harus memiliki angka, huruf besar, dan simbol!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new usermodel({ username, password: hashedPassword });
        await newUser.save();

        return res.status(201).send("✅ User berhasil didaftarkan!");
    } catch (error) {
        return res.status(500).send(`❌ Error: ${error}`);
    }
});

// Route untuk login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await usermodel.findOne({ username });

        if (!user) {
            return res.status(400).send("❌ Username atau password salah!");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("❌ Password salah!");
        }

        return res.status(200).send("✅ Login berhasil!");
    } catch (error) {
        return res.status(500).send(`❌ Error saat login: ${error}`);
    }
});

// Route untuk update user
router.put("/update", async (req, res) => {
    try {
        const { username, newUsername, newPassword, password } = req.body;

        const user = await usermodel.findOne({ username });
        if (!user) {
            return res.status(404).send("❌ User tidak ditemukan!");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("❌ Password lama salah!");
        }

        const updateData = {};
        if (newUsername) updateData.username = newUsername;
        if (newPassword) updateData.password = await bcrypt.hash(newPassword, 10);

        await usermodel.updateOne({ _id: user._id }, { $set: updateData });

        return res.status(200).send("✅ User berhasil diperbarui!");
    } catch (error) {
        return res.status(500).send(`❌ Terjadi error: ${error}`);
    }
});

// Route untuk hapus user
router.delete("/delete", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await usermodel.findOne({ username });

        if (!user) {
            return res.status(404).send("❌ User tidak ditemukan!");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("❌ Password salah!");
        }

        await usermodel.deleteOne({ _id: user._id });

        return res.status(200).send("✅ Akun berhasil dihapus!");
    } catch (error) {
        return res.status(500).send(`❌ Terjadi error: ${error}`);
    }
});

// Router untuk user logout


module.exports = router;
