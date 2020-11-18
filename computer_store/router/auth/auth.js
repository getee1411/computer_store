const express = require("express")
const auth = express()
const md5 = require("md5")
const models = require("../../models/index")
const admin = models.admin

const jwt = require("jsonwebtoken")
const SECRET_KEY = "1234"

auth.use(express.urlencoded({extended: true}))
auth.post("/", async(req,res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await admin.findOne({where: data})
    if(result){
        let payload = JSON.stringify(result)
        return res.json({
            data: result,
            token: jwt.sign(payload, SECRET_KEY)
        })
    }

    return res.json({
        message: "Invalid username or password"
    })
})

module.exports = auth