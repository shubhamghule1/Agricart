var express = require('express');
var router = express.Router();


router.get('/', (req, res)=>{

	if(req.session.type =='ADMIN'){
		info = {
			username: req.session.name,
		}
		res.render('login/adminDashboard', info);
	}

	else {
		res.redirect("/");
	}

});

router.post('/', (req, res)=>{


});




module.exports = router;