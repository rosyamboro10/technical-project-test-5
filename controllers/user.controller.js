const bcrypt = require('bcrypt');
const User = require("../models/user")

module.exports = {
  getAllUser: (req, res) => {
    
  },

  getUserByID: (req, res) => {

  },

  addUser: (req, res) => {
    const data = req.body

    const saltRounds = 10
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash
    
    const user = new User(data)

    user.save()

    res.json({
      message: "data has been created!!",
    })
  },

  deleteUserByID: (req, res) => {
 
  },

  updateUserByID: (req, res) => {

  },

  login: async (req, res) => {
    const data = req.body
    
    const user = await User.findOne({email: data.email})

    const checkPwd = bcrypt.compareSync(data.password, user.password)

    if(checkPwd){
      res.json({
        message: "berhasil login"
      })
    }
  }
}