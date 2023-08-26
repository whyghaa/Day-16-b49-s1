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

// dummy data
const dataBlog = [
	{
	  title: "Android Development",
	  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut amet culpa fugiat minus impedit beatae itaque modi accusamus enim tenetur, officiis ab fugit quam neque ex iusto, quibusdam molestias dignissimos! A nobis exercitationem sit, eaque voluptatibus dignissimos nemo omnis numquam vitae nesciunt nisi rerum voluptates, unde expedita, ipsum quaerat perferendis quas deleniti. Fuga, vero id? Ut eius harum eos illo aut placeat laboriosam, odit dolores similique. Atque maiores expedita, earum explicabo eveniet fugiat praesentium est sed ducimus ad corrupti quae quod nulla distinctio alias soluta porro doloremque facere dicta minus! Quia id iusto iure enim sunt cumque debitis repudiandae consequuntur!",
	  images: "image/project-1.jpg",
	},
	{
	  title: "Mobile Developer",
	  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut amet culpa fugiat minus impedit beatae itaque modi accusamus enim tenetur, officiis ab fugit quam neque ex iusto, quibusdam molestias dignissimos! A nobis exercitationem sit, eaque voluptatibus dignissimos nemo omnis numquam vitae nesciunt nisi rerum voluptates, unde expedita, ipsum quaerat perferendis quas deleniti. Fuga, vero id? Ut eius harum eos illo aut placeat laboriosam, odit dolores similique. Atque maiores expedita, earum explicabo eveniet fugiat praesentium est sed ducimus ad corrupti quae quod nulla distinctio alias soluta porro doloremque facere dicta minus! Quia id iusto iure enim sunt cumque debitis repudiandae consequuntur!",
	  images: "image/project-4.png",
	},
	{
	  title: "Web Developer",
	  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut amet culpa fugiat minus impedit beatae itaque modi accusamus enim tenetur, officiis ab fugit quam neque ex iusto, quibusdam molestias dignissimos! A nobis exercitationem sit, eaque voluptatibus dignissimos nemo omnis numquam vitae nesciunt nisi rerum voluptates, unde expedita, ipsum quaerat perferendis quas deleniti. Fuga, vero id? Ut eius harum eos illo aut placeat laboriosam, odit dolores similique. Atque maiores expedita, earum explicabo eveniet fugiat praesentium est sed ducimus ad corrupti quae quod nulla distinctio alias soluta porro doloremque facere dicta minus! Quia id iusto iure enim sunt cumque debitis repudiandae consequuntur!",
	  images: "image/project-2.png",
	}
  ]

//routing 
app.get('/', home)
app.get('/blog', blog)
app.get('/blog-detail/:id', blogDetail)
app.get('/contact', contact)
app.post('/blog', addBlog)
app.get("/edit-blog/:id", editBlog)
app.post("/update-blog/:id", updateBlog)
app.get("/delete-blog/:id", deleteBlog)

//local server 
app.listen(PORT, () => {
    console.log("Server Running on port ${PORT}")
})

//index
function home(req, res) {
    res.render('index', {dataBlog})
}

//blog 
function blog(req, res) {
    res.render('blog')
}

// add a new blog
function addBlog(req, res) {
	const { title, startDate, endDate, content, images } = req.body;

	const data = {
		  title,
		  content,
		  images,
		  startDate,
		  endDate,
	};

	dataBlog.push(data)
	res.redirect("/")
}

// edit blog
function editBlog(req, res) {
	const id = parseInt(req.params.id);
	res.render("edit-blog", { blog: dataBlog[id], blogIndex: id })
}

// update blog
function updateBlog(req, res) {
	const blogIndex = parseInt(req.body.blogIndex)
	const { title, content } = req.body;

	dataBlog[blogIndex].title = title;
	dataBlog[blogIndex].content = content;

	res.redirect("/");
}

//blog-detail
function blogDetail(req, res) {
	const { id } = req.params;
    res.render('blog-detail', { blog: dataBlog[id] })
}

//contact 
function contact(req, res) {
    res.render('contact')
}

// Delete blog
function deleteBlog(req, res) {
	const { id } = req.params;

	dataBlog.splice(id, 1)
	res.redirect("/")
}