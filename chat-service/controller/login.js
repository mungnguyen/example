const db = require("../models");

exports.login = async function (req, res) {
    console.log("Log-In");
    try {
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            res.status(422).json({ error: "NO-USER" })
        } else if (user.password !== req.body.password) {
            res.status(422).json({ error: "PASSWORD_ERROR" })
        } else res.json(user)
    } catch (err) {
        console.log("login", err)
        throw err
    }
}