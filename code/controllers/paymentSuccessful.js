var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{

	res.render('shared/payment-successful');

});


module.exports = router;