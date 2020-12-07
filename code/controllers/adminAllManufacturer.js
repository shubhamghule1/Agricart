var express = require('express');
const manModel = require('../model/manModel');
// var manModel = require.main.require('./model/manModel');
var router = express.Router();


router.get('/', (req, res)=>{

	manModel.getAllManufacturer(function(results) {

		var manufacturer = {
		List: results
		};

		res.render('admin/all-manufacturers', manufacturer);
		});


});

router.get('/edit/:id', (req, res)=>{

	if(req.session.type =='ADMIN'){
    
	manModel.get(req.params.id, function(result){
		if(result.length >0 ){
			var allData= {
				result : result[0],
				message : ''
			};
			res.render('admin/edit-manufacturers', allData);
		}

	});	
	}	
		else{
			res.redirect('/');
		}

	});
	
	router.post('/edit/:id', (req, res)=>{
		var result = {
			manName : req.body.man_name,
			manAddress: req.body.man_address,
			// manLicense : req.body.man_license,
		};
		var manufacturer ={
			id: req.params.id,
			result : result,
			message : 'Info Updated'
		};
		
		manModel.update(manufacturer, function(success){
			if(success){
				res.redirect('/allmanufacturers');
			}else{
				res.send('Updating Failed');
			}
		});
	});
	
	router.get('/delete/:id', (req, res)=>{

		if(req.session.type =='ADMIN'){
			manModel.delete(req.params.id, function(result){
				res.redirect("/allmanufacturers");
			});	
		}	
		else{
			res.send('Deletion Failed');
		}
	});

module.exports = router;