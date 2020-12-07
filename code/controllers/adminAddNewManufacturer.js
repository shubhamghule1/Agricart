var express = require('express');
var manModel = require.main.require('./model/manModel');
var router = express.Router();


router.get('/', (req, res)=>{

		res.render('admin/add-new-manufacturer',{message:null});
});

router.post('/', (req, res)=>{

	var manufacturer = {
	manName : req.body.man_name,
	manAddress : req.body.man_address,
	manLicense : req.body.man_license,
	};
	// console.log("man in new man",manufacturer);


		manModel.checkManufacturer(manufacturer, function(result) {
			// console.log(result);
			if(result.length == 0) {
				manModel.insertManufacturer(manufacturer, function(success){
					// console.log("success: ",success);
					if(success){
						res.redirect('/allmanufacturers');
					}else{
						res.send("Failed");
					} 
				});
			}
			else{
				res.render("admin/add-new-manufacturer",{message:"Manufacturer Already Exist"});
			}
		});	


});

	

module.exports = router;