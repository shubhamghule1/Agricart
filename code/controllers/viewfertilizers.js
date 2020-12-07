var express = require('express');
var userModel = require.main.require('./model/fertModel');
var router = express.Router();


router.get('/', (req, res)=>{
	
	if(req.session.type =='ADMIN'){
	userModel.getAll(function(results) {

		var user = {
		List: results
		};

		res.render('admin/all-fertilizers', user);
		});	
	}
	

	else {
        res.redirect("/");
        }
		
});

 router.get('/edit/:id', (req, res)=>{

	if(req.session.type =='ADMIN'){
    
	userModel.get(req.params.id, function(result){
		if(result.length >0 ){
			var allData= {
				result : result[0],
				message : ''
			};
			res.render('admin/edit-fertilizers', allData);
		}else{
			res.redirect('/');
		}
	});

	}

	else {
        res.redirect("/");}
});

router.post('/edit/:id', (req, res)=>{
	var result = {
		name : req.body.fert_name,
        price : req.body.price,
        stock: req.body.stock,
        man_id: req.body.man_id,
        date_mfd: req.body.date_mfg,
        date_expiry: req.body.date_expiry,
        description : req.body.med_desc,
        category : req.body.category,
        image : `assets/images/product/${req.body.fert_name}.jpg`,
        type: req.body.fert_type,
        availability: 1,
	};
	var user ={
		id: req.params.id,
		result : result,
		message : 'Medicine Info Updated'
	};
	
	userModel.updateMedInfo(user, function(success){
		if(success){
			res.redirect('/viewfertilizers');
		}else{
			res.send('Updating Failed');
		}
	});
});

router.get('/delete/:id', (req, res)=>{

	if(req.session.type =='ADMIN'){
		userModel.delete(req.params.id, function(result){
			res.redirect("/viewfertilizers");
		});	
	}	
	else{
		res.redirect('/');
	}
});	




module.exports = router;