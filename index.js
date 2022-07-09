import express from 'express'
import cors from 'cors'
import { users, discussions, requests } from './data.js'

const app = express()
const port = 5000


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



let newUsers = users
let newRequests = requests
let newDiscussions = discussions



app.get("/", (req, res) => {

    res.send("Welcome...!")
})


app.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body
    let user = {}
    let message = ''
    users.map((item) => {
        if (item.email == email) {
            message = "User already exist."
        } else {
            newUsers.push(req.body)
            message = "Sign in Successfull"
        }
    })
    res.send({ user: req.body, message })
})


app.post('/login', (req, res) => {
    const { email } = req.body
    let message = ''
    let user = users.find((item) => item.email === email)
    if (!user) {
        message = "Not Found."
    } else {
        message = "Login successfull!"
    }
    res.send({ user, message })
})


app.get("/users", (req, res) => {
    res.send(users)
})


app.post("/postDiscussion", (req, res) => {
    newDiscussions.unshift(req.body)
    res.send(newDiscussions)
})


app.get("/discussions", (req, res) => {
    res.send(newDiscussions)
})


app.post("/addModerator", (req, res) => {
    let firstName = req.body.name
    let { email, isModerator, isAdmin } = req.body
    newUsers.push({ firstName, email, isModerator, isAdmin })
    res.send(newUsers)
})

app.get("/allrequests", (req, res) => {
    res.send(newRequests)
})

app.post("/request", (req, res) => {
    newRequests.push(req.body)
    res.send(newRequests)
})





app.listen(port, () => {
    console.log(`app is listening on http://localhost:${port}`)
})