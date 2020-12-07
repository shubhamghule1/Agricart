var express = require('express');
var userModel = require.main.require('./model/userModel');
var router = express.Router();


router.get('/', (req, res)=>{

	userModel.getAllUsers(function(results) {

		var user = {
			List: results,
			uid: req.session.uid
		};

		// console.log(req.session.uid);

		res.render('admin/all-users', user);
	});


});

router.get('/edit/:id', (req, res)=>{

	if(req.session.type =='ADMIN'){
    
	userModel.get(req.params.id, function(result){
		// console.log(result);
		if(result.length >0 ){
			var allData= {
				result : result[0],
				message : ''
			};
			res.render('admin/edit-users', allData);
		}

	});	
	}	
		else{
			res.redirect('/');
		}

});
	

router.post('/edit/:id', (req, res)=>{
		var result = {
			name : req.body.name,
			contact: req.body.contact,
			email: req.body.email,
			password : req.body.password,
			type : req.body.UserType
		};
		var user ={
			id: req.params.id,
			result : result,
			message : 'Info Updated'
		};
		
		userModel.update(user, function(success){
			if(success){
				res.redirect('/allusers');
			}else{
				res.send('Updating Failed');
			}
		});
});
	

router.get('/delete/:id', (req, res)=>{

	if(req.session.type =='ADMIN'){
		userModel.delete(req.params.id, function(result){
			res.redirect("/allusers");
		});	
	}	
	else{
		res.redirect('/');
	}

});


module.exports = router;