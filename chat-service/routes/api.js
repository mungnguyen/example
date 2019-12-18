
module.exports = function (app) {
    const { login } = require("../controller/login")
    const { listAllGroup } = require("../controller/group")

    app.post("/login", login)

    //group api
    app.get("/group/:userId", listAllGroup)
}