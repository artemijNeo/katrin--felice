let data
let all = true

let name
let price
let size

let search

let product

const Pool = require("pg").Pool

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "F@v0r1T",
    database: "KatrinFelice"
})

pool.connect()

// async function getData (filter = "") {
//     return new Promise((resolve, reject) => {
//         let query = `Select * from product`
//         if (filter != "") {
//             query = query + " where " + filter
//         }
//         query += " order by format"
//         console.log(query)
//         pool.query(query, (err, res) => {
//             if (!err) {
//                 data = JSON.stringify(res.rows)
//                 resolve(data)
//             } else {
//                 console.log(err.message)
//             }
//             pool.end
//         })
//     })

// }

async function getData (filter = "") {
    return new Promise((resolve, reject) => {
        let query = `Select * from product`
        if (filter != "") {
            query = query + " where " + filter
        }
        query += " order by format"
        console.log(query)
        pool.query(query, (err, res) => {
            if (!err) {
                data = JSON.stringify(res.rows)
                resolve(data)
            } else {
                console.log(err.message)
            }
            pool.end
        })
    })

}

getData()


const http = require('http')
const express = require("express")
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

const port = 5500


let cors = require("cors")
app.use(cors())
app.use(bodyParser.json())

app.listen(port, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("listening to port 5500")
    }
})

app.get("/database", (req, res) => {
    
    try {


        
        let filter = ""

        if (req.query.all) {
            name = ""
            price = ""
            size = ""
        }
        if (req.query.name) {
            name = (req.query.name).replace(/%20/g, " ").replace(/%27/g, "'")
            if (req.query.name.replace(/%20/g, " ").replace(/%27/g, "'") === "%%%%all%%%") {
                name = ""
            }

        }
        if (req.query.price) {
            price = req.query.price
        }
        if (req.query.size) {
            size = (req.query.size).replace(/%20/g, " ").replace(/%27/g, "'")
        }

        stringFormer (name, price, size)

        function stringFormer (Name, Price, Size) {
            let arr = [Name, Price, Size]
            for (i = 0; i<arr.length; i++) {
                if (arr[i]) {
                    console.log(arr[i] + "for")
                    if (filter==="") {
                        filter = arr[i]
                    } else {
                        filter += " and " + arr[i]
                    }
                }
            }
        }

        //console.log(filter)


        res.set('Content-Type', 'application/JSON')

        getData(filter).then((Data) => {
            res.send(Data)
            res.end()
        })

    } catch (err) {
        console.log(err)
    }
    //console.log(data)
})


app.get("/index2page.html", (req, res) => {
    if (req.query.search) {
        search = req.query.search

        getData("url like '" + search +"'").then((Data) => {
            res.send(Data)
        })
    } else {
        res.end()
    }
})
