var express = require('express');
var router = express.Router();
var userModel = require.main.require('./model/userModel');
var fertModel = require.main.require('./model/fertModel');
var orderModel = require.main.require('./model/orderModel');


router.get('/', (req, res)=>{
	// console.log("result", req.session);

	if(req.session.type == "CUSTOMER"){
		fertModel.getAll(function(results) {
			// console.log("results", results);
			var fertilizers = {
				fertList: results,
				username: req.session.name,
			};

			res.render('login/userDashboard', fertilizers);
		});
	}
	else{
		res.redirect('/');
		
	}
});

router.get('/profile', (req, res)=>{

	profileid = req.session.uid;

	userModel.get(profileid, function(result){
		// console.log(result);
		if(result.length > 0){
			res.render('user/profile', {result: result[0], username: result[0].user_username});
		}
	});	
});

router.post('/profile', (req, res)=>{

	var user ={
		id: req.session.uid,
		name: req.body.name,
		contact: req.body.contact,
		email: req.body.email,
		password : req.body.password
	};

	userModel.updateProfile(user, function(success){
		if(success){
			res.redirect('/userdashboard/profile');
		}else{
			res.send("Failed");
		}
	});

});


router.get('/history', (req, res)=>{

	var user ={
		id: req.session.uid,
		name: req.body.name,
		email: req.body.email,
		password : req.body.password
	};

	// console.log("ID: ", req.session.uid);

	orderModel.get(req.session.uid,function(results) {
		// console.log(results);
		// console.log("uname", req.session.name);
		var info = {
			orderList: results,
			username: req.session.name,
			uid: req.session.uid
		};

		res.render('user/user-history', info);
	});

});

router.get('/product/:id', (req, res)=>{
	fertModel.get(req.params.id, function(results){
		// console.log("results", results);
		res.render('user/product-details', {productInfo:results[0], username: req.session.name, uid:req.session.uid});
	});
});


router.get('/:userId/checkout/:productId', (req, res)=>{

	userModel.get(req.params.userId, function(userDetails){
		// console.log(userDetails);
		fertModel.get(req.params.productId, function(productDetails){
			transactionData = {
				userDetails: userDetails[0],
				productDetails: productDetails[0]
			}

			req.session.pid = req.params.productId;

			res.render('user/checkout', transactionData);
		});
	});

});

router.post('/:userId/checkout/:productId', (req, res)=>{

	fertModel.getPrice(req.session.pid, function(result){
		// console.log("asdasd", req.body.price_per_unit);
		// console.log("typeof", typeof(req.body.price_per_unit));
		var total_cost = parseInt(req.body.quantity)*(req.body.price_per_unit);
		if(result){
			var order ={
				uid: req.session.uid,
				pid: req.session.pid,
				quantity: req.body.quantity,
				contact: req.body.alt_contact,
				payment_mode: req.body.payment_mode,
				total_cost: total_cost,
			};
		
			orderModel.insertOrder(order, function(success){
				if(success){
					res.redirect("/paymentsuccessful");
				}
				else{
					res.send("error in inserting order!");
				}
			});
		}
		else{
			result.send("error in getting price!");
		}
	});

});

router.get('/viewfertilizers', (req, res)=>{
	
	if(req.session.type =='CUSTOMER'){
		fertModel.getAll(function(results) {

			var fertilizer = {
				List: results,
				username: req.session.name
			};

			res.render('user/all-fertilizers', fertilizer);
		});	
	}

	else {
        res.redirect("/");
        }
		
});




module.exports = router;