const express = require("express");
const path = require("path");
const hbs = require("hbs");

const User = require("./models/userMsg")

require("./db/conn");

const app = express();

const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");


app.use(express.static(staticPath));
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({extended:false}));

app.set("view engine", "hbs");
app.set("views",viewsPath);

hbs.registerPartials(partialPath);

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/contact", (req,res) => {
    res.render("contact");
});

app.post("/contact", async(req,res) => {
    try
    {
        const userData = new User(req.body);
        const result = await userData.save()

        if(result)
        {
            res.status(201).render("index");
        }
    }
    catch(err)
    {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Port started at ${port}`);
});