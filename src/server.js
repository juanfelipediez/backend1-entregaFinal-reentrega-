import express from "express"
import cartsRoutes from "./routes/cart.routes.js"
import productsRoutes from "./routes/product.routes.js"
import handlebars from "express-handlebars"
import Handlebars from "handlebars"
import __dirname from "./dirname.js"
import viewsRouter from "./routes/views.router.js"
import mongoose from 'mongoose';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 5000

const userName = '' //completar
const password = '' //completar
const dbName = '' //completar


mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.wsvtnkd.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('DB connected!')
    })
    .catch((error) => {
        console.log(error)
    })

app.engine("handlebars", handlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}))
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname+"/public"))

app.use("/api/carts", cartsRoutes)
app.use("/api/products", productsRoutes)

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})


app.use('/', viewsRouter)
