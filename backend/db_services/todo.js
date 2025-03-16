const express = require("express");
const router = express.Router();
const db = require("../db");

const todoSchema = new db.Schema({
    userid: { type: String, required: true },
    todo: { type: String, required: true },
    date: { type: Date, default: Date.now },
    complete: { type: Boolean, required: true }
});

const todoModel = db.model("todos", todoSchema);
todoModel.createIndexes({ userid: 1 });

// 🔹 Tambah Todo
router.post("/add", async (req, res) => {
    try {
        const { userid, todo, complete } = req.body;
        const newTodo = new todoModel({ userid, todo, complete });
        await newTodo.save();
        return res.status(201).send("✅ Todo berhasil ditambahkan!");
    } catch (error) {
        return res.status(500).send(`❌ Error saat menambah todo: ${error}`);
    }
});

// 🔹 Tampilkan Todo
router.get("/show/:userid", async (req, res) => {
    try {
        const { userid } = req.params;
        const todos = await todoModel.find({ userid });

        if (todos.length === 0) {
            return res.status(404).send("❌ Tidak ada tugas!");
        }

        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).send(`❌ Error saat mengambil todo: ${error}`);
    }
});

// 🔹 Hapus Todo
router.delete("/delete/:todoid", async (req, res) => {
    try {
        const { todoid } = req.params;
        const result = await todoModel.deleteOne({ _id: todoid });

        if (result.deletedCount === 0) {
            return res.status(404).send(`❌ Todo dengan ID ${todoid} tidak ditemukan.`);
        }

        return res.status(200).send(`✅ Todo dengan ID ${todoid} berhasil dihapus.`);
    } catch (error) {
        return res.status(500).send(`❌ Error saat menghapus todo: ${error}`);
    }
});

module.exports = router;
