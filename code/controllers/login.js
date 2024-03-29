var express = require('express');
var userModel = require.main.require('./model/adminModel');
var mysql = require('mysql');
var router = express.Router();


router.get('/', (req, res)=>{

	if(req.session.type=='CUSTOMER'){
		res.redirect('/userdashboard');
	}
	if(req.session.type=='ADMIN'){
		res.redirect('/admindashboard');
	}
	else{res.render('home/index', {message: null});}
});



 router.post('/', (req, res)=>{

		var user = {
			uname : req.body.uname,
			password : req.body.pwd
		};
		userModel.validate(user, function(result){
			if(result.length > 0){
				req.session.name = req.body.uname;
				req.session.type = result[0].user_type;
				req.session.uid = result[0].user_id;
				// console.log(req.session);
				if(result[0].user_type == "ADMIN") {res.redirect('/admindashboard');}
				if(result[0].user_type == "CUSTOMER") {res.redirect('/userdashboard');}
			}else{
				res.render('home/index', {message: "incorrect username or password"});
			}
		});
});




module.exports = router;