var express = require('express');
var fertModel = require.main.require('./model/fertModel');
var router = express.Router();


// var counter = 1;


function getDateTime() {

    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
router.get('/', (req, res)=>{

    var user = {
        message: ''
        };
    
    if(req.session.type =='ADMIN'){
        res.render('admin/add-new-fertilizer', user);
        }

    else {
        res.redirect("/");
        }
});

router.post('/', (req, res)=>{

    // console.log("date", req.body.date_mfg);
    
     var fertilizer = {
        name : req.body.fert_name,
        price : req.body.price,
        stock: req.body.stock,
        man_id: req.body.man_id,
        date_mfd: req.body.date_mfg,
        date_expiry: req.body.date_expiry,
        med_desc : req.body.med_desc,
        category : req.body.category,
        image : `assets/images/fertilizer/${req.body.fert_name}.jpg`,
        type: req.body.fert_type,
        availability: 1,
        message : 'Fertilizer Added Successfully',
        list : ''
    };

    // counter++

    fertModel.getByFertName(fertilizer.name, function(result){
        // console.log(result);
        if(result.length == 0){
            fertModel.insert(fertilizer, function(success){
                if(success){
                    res.render('admin/add-new-fertilizer', fertilizer);
                }else{
                    fertilizer.message = "Adding fertilizer failed!";
                    res.render('admin/add-new-fertilizer', fertilizer);
                }
            });
        }
        else{
            fertilizer.message = "Already Exists";
            res.render('admin/add-new-fertilizer', fertilizer);
        }
    });
     

});



module.exports = router;