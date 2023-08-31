const express = require ('express')
const app = express()
const PORT = 8080
const path = require("path")
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')

// sequelize init
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

// setup call hbs with sub folder
app.set("view engine","hbs")
app.set("views",path.join(__dirname, "src/views"))


// set serving static file
app.use(express.static(path.join(__dirname, "src/assets")))

// set serving static file specific
app.use(express.static(path.join(__dirname, "src/assets/image")))

// //parsing data 
app.use(express.urlencoded({ extended: false }))

// setup flash
app.use(flash())

// setup session
app.use(session({
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 2
  },
  store: new session.MemoryStore(),
  saveUninitialized: true,
  resave: false,
  secret: 'secretValue'
}))

//routing 
app.get('/', home)
app.get('/blog', blog)
app.post('/blog', addBlog)
app.get('/blog-detail/:id', blogDetail)
app.get('/contact', contact)
app.get("/edit-blog/:id", editBlog)
app.post("/update-blog/:id", updateBlog)
app.get("/delete-blog/:id", deleteBlog)

// login, register, logout 
app.get("/register", formRegister)
app.post("/register", addUser)
app.get("/login", formLogin)
app.post("/login", userLogin)
app.get("/logout", logout)

//local server 
app.listen(PORT, () => {
    console.log("Server Running on port ${PORT}")
})


//index
async function home(req, res) {
	try {
		const query = `SELECT * FROM public."Users";`
		let obj = await sequelize.query(query, { type: QueryTypes.SELECT })

		const data = obj.map((res) => ({
			...res,
			isLogin: req.session.isLogin,
		}));

		res.render("index", {
			data,
			isLogin: req.session.isLogin,
			sigin: req.session.sigin,
		});
	} catch (err) {
		console.log(err)
	} 
}

// blog
function blog(req, res) {
	res.render("blog", {
			isLogin: req.session.isLogin,
			sigin: req.session.sigin,
		});
}

// add a new blog
async function addBlog(req, res) {
	try {
		const {
			name,
			start_date,
			end_date,
			description,
			javascript,
			reactjs,
			vuejs,
			nodejs,
		} = req.body;
		const image = "project-1.jpg"

	let start = new Date(start_date);
	let end = new Date(end_date);

	if (start > end) {
		return res.send("You Fill End Date Before Start Date");
	}

	let difference = end.getTime() - start.getTime();
	let days = difference / (1000 * 3600 * 24);
	let weeks = Math.floor(days / 7);
	let months = Math.floor(weeks / 4);
	let years = Math.floor(months / 12);
	let duration = "";

	if (years > 0) {
		duration = years + " Tahun";
	} else if (months > 0) {
		duration = months + " Bulan";
	} else if (weeks > 0) {
		duration = weeks + " Minggu";
	} else if (days > 0) {
		duration = days + " Hari";
	}	

	// Mengubah nilai string kosong menjadi false jika checkbox tidak dipilih
	const javascriptValue = javascript === "true" ? true : false;
	const reactjsValue = reactjs === "true" ? true : false;
	const vuejsValue = vuejs === "true" ? true : false;
	const nodejsValue = nodejs === "true" ? true : false;

	await sequelize.query(
		`INSERT INTO "Users" (name, start_date, end_date, description, nodejs, reactjs, javascript, vuejs, duration, image) VALUES ('${name}','${start_date}','${end_date}','${description}',${nodejsValue},${reactjsValue},${vuejsValue},${javascriptValue},'${duration}','${image}')`
	);

	res.redirect("/");
	} catch (err) {
	console.log(err);
	}
}

// edit blog
async function editBlog(req, res) {
	try {
		const id = parseInt(req.params.id);
		const query = `SELECT * FROM "Users" WHERE id=${id}`
		const obj = await sequelize.query(query, {type: QueryTypes.SELECT,})
		res.render("edit-blog", { blog: obj[0], blogIndex: id })
	} catch (err) {
		console.log(err)
	}
}	


// update blog
async function updateBlog(req, res) {
	try {
		const { id } = req.params;
		const {
			name,
			start_date,
			end_date,
			description,
			javascript,
			reactjs,
			vuejs,
			nodejs,
		} = req.body;
		const image = "project-1.jpg"
	
		let start = new Date(start_date);
		let end = new Date(end_date);
	
		if (start > end) {
			return res.send("You Fill End Date Before Start Date");
		}
	
		let difference = end.getTime() - start.getTime();
		let days = difference / (1000 * 3600 * 24);
		let weeks = Math.floor(days / 7);
		let months = Math.floor(weeks / 4);
		let years = Math.floor(months / 12);
		let duration = "";
	
		if (years > 0) {
			duration = years + " Tahun";
		} else if (months > 0) {
			duration = months + " Bulan";
		} else if (weeks > 0) {
			duration = weeks + " Minggu";
		} else if (days > 0) {
			duration = days + " Hari";
		}	

	// Mengubah nilai string kosong menjadi false jika checkbox tidak dipilih
		const javascriptValue = javascript === "true" ? true : false;
		const reactjsValue = reactjs === "true" ? true : false;
		const vuejsValue = vuejs === "true" ? true : false;
		const nodejsValue = nodejs === "true" ? true : false;

		await sequelize.query(
			`UPDATE public."Users" SET name='${name}', start_date='${start_date}', end_date='${end_date}', description='${description}', nodejs=${nodejsValue}, reactjs=${reactjsValue}, vuejs=${vuejsValue}, javascript=${javascriptValue}, duration='${duration}', image='${image}' WHERE id=${id};`,
			{
				type: sequelize.QueryTypes.UPDATE,
			}
		);

		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
}

//blog-detail
async function blogDetail(req, res) {
	try {
		const { id } = req.params;
		const  query = `SELECT * FROM "Users" WHERE id=${id}`
		const obj = await sequelize.query(query, {type: QueryTypes.SELECT})

		const data = obj.map(res => ({
			...res,
		}))

      res.render('blog-detail', { 
				blog: data[0],
				isLogin: req.session.isLogin,
				sigin: req.session.sigin,
			});
	} catch (err) {
	  console.log(err)
  }
}

//contact 
function contact(req, res) {
    res.render('contact', {
			isLogin: req.session.isLogin,
			sigin: req.session.sigin,
		});
	}

// Delete blog
async function deleteBlog(req, res) {
	try {
		const { id } = req.params;
		await sequelize.query(`DELETE FROM "Users" WHERE id = ${id}`)
		res.redirect("/")
	} catch (err) {
		console.log(err)
	}
}

// Register
function formRegister(req, res) {
	res.render('register')
  }
  
  async function addUser(req, res) {
	try {
	  const { name, email, password } = req.body
	  const salt = 10

	  await bcrypt.hash(password, salt, (err, hashPassword) => {
		const query = `INSERT INTO sigins (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`
		sequelize.query(query)
		res.redirect('login')
	  })
	} catch (err) {
	  console.log(err)
	}
  }

// Login 
function formLogin(req, res) {
	res.render('login')
  }
  
  async function userLogin(req, res) {
	try {
	  const { email, password } = req.body
	  const query = `SELECT * FROM sigins WHERE email = '${email}'`
	  let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
  
	  console.log(obj)
  
	  // Memeriksa apakah email belum terdaftar
	  if(!obj.length) {
		req.flash('danger', "Anda Belom Terdaftar!")
		return res.redirect('/login')
	  }
  
	  await bcrypt.compare(password, obj[0].password, (err, result) => {
		if(!result) {
		  req.flash('danger', 'Password Yang Anda Masukan Salah!')
		  return res.redirect('/login')
		} else {
		  req.session.isLogin = true
		  req.session.sigin = obj[0].name
		  req.flash('success', 'Login Sukses')
		  res.redirect('/')
		}
	  })
	} catch (err) {
	  console.log(err)
	}
  }
  
// logout
function logout(req, res) {
	if (req.session.isLogin) {
		req.session.destroy((err) => {
			if (err) {
				console.log(err);
			} else {
				res.redirect("/");
			}
		});
	} else {
		res.redirect("/");
	}
}

