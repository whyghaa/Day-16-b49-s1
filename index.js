const express = require ('express')
const app = express()
const PORT = 8080
const path = require("path")

// setup call hbs with sub folder
app.set("view engine","hbs")
app.set("views",path.join(__dirname, "src/views"))


// set serving static file
app.use(express.static(path.join(__dirname, "src/assets")))

// //parsing data 
app.use(express.urlencoded({ extended: false }))

//routing 
app.get('/', home)
app.get('/blog', blog)
app.get('/blog-detail', blogDetail)
app.get('/contact', contact)
app.post('/blog', addBlog)

//local server 
app.listen(PORT, () => {
    console.log("Server Running on port ${PORT}")
})

//index
function home(req, res) {
    res.render('index')
}

//blog 
function blog(req, res) {
    res.render('blog')
}

// add a new blog
function addBlog(req, res) {
	const { title, startDate, endDate, content, framework, images } = req.body;

	console.log(title);
	console.log(startDate);
	console.log(endDate);
	console.log(content);
    console.log(framework)
	console.log(images);

	res.redirect("/");
}

//blog-detail
function blogDetail(req, res) {
    res.render('blog-detail')
}

//contact 
function contact(req, res) {
    res.render('contact')
}