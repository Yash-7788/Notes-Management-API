const db = require("../config/db");

const createNotes = (req, res) => {

    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const query = `
        INSERT INTO notes (title, content, user_id)
        VALUES (?, ?, ?)
    `

    db.run(query, [title, content, userId], function (err) {

        if (err) {
            return res.status(500).json({ message: "Error creating note" });
        }

        res.status(201).json({ message: "Note created" });
    })
}

const getNotes = (req, res) => {

    const userId = req.user.id;
    const role = req.user.role;

    let query = `SELECT * FROM notes`;
    let params = [];

    if (role != "admin") {
        query += ` WHERE user_id = ?`;
        params.push(userId);
    }

    db.all(query, params, (err, rows) => {

        if (err) {
            return res.status(500).json({ message: "Error fetching notes" });
        }

        res.json(rows)
    })
}

const updateNotes = (req, res) => {

    const noteId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    let query = `
         UPDATE notes
         SET TITLE = ?, content = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?
    `
    let params = [title, content, noteId];

    if (role !== "admin") {
        query += ` AND user_id = ?`;
        params.push(userId);
    }

    db.run(query, params, function (err) {

        if (err) {
            return res.status(500).json({ message: "Error updating notes" });
        }

        if (this.changes === 0) {
            return res.status(403).json({ message: "NOT ALLOWED" })
        }

        res.json({ message: "Note updated" });
    })
};


const deleteNotes = (req, res) => {

    const noteId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;

    let query = `DELETE FROM notes WHERE id = ?`
    let params = [noteId];

    if (role !== "admin") {
        query += ` AND user_id = ?`;
        params.push(userId);
    }

    db.run(query, params, function (err) {

        if (err) {
            return res.status(500).json({ message: "Error deleting notes" });
        }

        if (this.changes === 0) {
            return res.status(403).json({ message: "NOT ALLOWED" })
        }

        res.json({ message: "Note deleted" });
    })
};

module.exports = { createNotes, getNotes, updateNotes, deleteNotes };