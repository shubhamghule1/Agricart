var express = require('express');
var userModel = require.main.require('./model/fertModel');
var orderModel = require.main.require('./model/orderModel');
var router = express.Router();


router.get('/', (req, res)=>{

	orderModel.getAll(function(results) {

		console.log(results);

		var user = {
		List: results
		};

		res.render('admin/all-orders', user);
		});


});



module.exports = router;