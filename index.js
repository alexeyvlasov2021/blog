import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogData = [
  {title:"about blog", text: "some text"},
  {title:"contacts", text: "some text abot contacts"}
];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {array: blogData});
  });

app.get("/page", (req, res) => {
    let id = req.query.id;
    res.render("page.ejs", {id: id, array: blogData});
  });

app.get("/edit", (req, res) => {
    let id = req.query.id;
    res.render("edit.ejs", {id: id, array: blogData});
  });

app.post("/save", (req, res) => {
    blogData[req.body.id].title = req.body.title;
    blogData[req.body.id].text = req.body.text;

    res.render("index.ejs", {array: blogData});
  });

app.get("/new", (req, res) =>{
    res.render("new.ejs");
});

app.post("/add", (req, res) => {
  blogData.push({title: req.body.title, text: req.body.text});
  res.render("index.ejs", {array: blogData});
});

app.post("/delete", (req, res) => {
  blogData.splice(req.body.id, 1);
  res.render("index.ejs", {array: blogData});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  