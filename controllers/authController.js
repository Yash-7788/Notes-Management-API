const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registeruser = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);


    const query = `
        INSERT INTO users (username , password)
        VALUES (? , ?)
      `

    db.run(query, [username, hashedPassword], function (err) {

        if (err) {
            return res.status(400).json({ message: "User already exists" });
        }

        res.status(201).json({ message: "User registered successfully" })
    })
}

const loginuser = ((req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username = ?`

    db.get(query, [username], (err, user) => {

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid Credentials" });
        };

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.json({ token })
    })
})

module.exports = { registeruser, loginuser };