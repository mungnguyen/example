const db = require("../models");
const Sequelize = require('sequelize');

exports.listAllGroupByUserId = async function (req, res) {
    try {
        const groupList = await db.group.findAll({
            include: [
                {
                    model: db.groupMember,
                    where: {
                        userId: req.params.userId
                    }
                }
            ]
        })

        res.json(groupList)
    } catch (err) {
        console.log("listAllGroupByUserId", err)
        res.status(400).json({ error: err })
    }
}

exports.createGroup = async function (req, res) {

}