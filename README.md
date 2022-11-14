* sebelumnya buat database terlebih dahulu
* membuat collection dengan 
```
db.createCollection("users")
db.createCollection("todos")
```
* untuk mengisikan data pada collection menggunakan
```
db.users.insertOne({nama: "bela",email: "bela@gmail.com",password: "123"})
db.todos.insertOne({activity: "mengerjakan tugas",desc: "mengerakan tugas pretest mongodb"})
```
* install mongoose di project anda
```
npm install mongoose
```
* buat folder config kemudian isi dengan file db.js yang berisi
```
const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/tpa-005'

const db = mongoose.connect(DB_URL)

module.exports = db
```
* buat folder controllers yang berisikan file dari document yang sudah dibuat 
    - user.controllers.js
```
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
```
* masing-masing method yang dibuat berasal dari file yang berada dirouter
* buat folder model untuk membuat schema, pada file ini merupakan representasi dari data document yang dibuat
* membuat user baru dengan addUser pada user.controller.js
```
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
```
  ![img](Gambar/img02.png)
  
  * login dengan
```
  login: async (req, res) => {
    const data = req.body
    
    const user = await User.findOne({email: data.email})

    const checkPwd = bcrypt.compareSync(data.password, user.password)

    if(checkPwd){
      res.json({
        message: "berhasil login"
      })
    }

```
![img](Gambar/img03.png)

* Membuat todo baru
  - pada todo.controller.js 
  ```
   addTodo: (req, res) => {
    const data = req.body
    const todo = new Todo(data)
    todo.save()

    res.json({
      message: "data has been created!!",
    })
  },
  ```

  ![img](Gambar/img04.png)

  * melihat semua todo
    - pada todo.controller.js
  ```
  getAllTodo: async (req, res) => {
    const todos = await Todo.find()

    res.json({
        message: "success get data todo",
        data: todos
    })
  },
  ```
  ![img](Gambar/img05.png)

* melihat detail todo
```
deleteTodoByID: async (req, res) => {
    const todo = await Todo.deleteByID(req.param.id)
    
    res.json({
        message: "data has been deleted!!",
      })
  },
```
* mengubah todo
```
updateTodoByID: async (req, res) => {
    const todo = await Todo.updateOne(req.param.id)
    todo.save()
    
    res.json({
        message: "data has been update!!",
    })
  },
  ```
* menghapus todo
```
deleteTodoByID: async (req, res) => {
    const todo = await Todo.deleteByID(req.param.id)
    
    res.json({
        message: "data has been deleted!!",
      })
  },
  ```
* menghapus semua todo
```
removeAllTodo: async (req, res) => {
    const todo = await Todo.remove()
    
    res.json({
        message: "collection has been deleted!!",
    })
  }
```

![img](Gambar/img06.png)
