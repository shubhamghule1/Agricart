var db = require('./db');

module.exports={

	get: function(id, callback){
		var sql = "select * from fertilizers where fert_id=?";

		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getPrice: function(id, callback){
		var sql = "select price_per_unit from fertilizers where fert_id=?";

		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getStock: function(id, callback){
		var sql = "select stock from fertilizers where fert_id=?";

		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getByFertName: function(name, callback){
		var sql = "select * from fertilizers where fert_name=?";

		db.getResult(sql, [name], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from fertilizers order by availability desc, fert_name asc";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getAllOrders: function(callback){
		var sql = "Select * from order_details d, fertilizers e  where d.product_id=e.id";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	insert: function(fertilizer, callback){
		
		var sql = "insert into fertilizers(fert_id, man_id,fert_type,fert_mfd,fert_expiry,stock,price_per_unit,availability,image,fert_name,fert_category,fert_desc ) values (NULL,?,?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [fertilizer.man_id,fertilizer.type, fertilizer.date_mfd, fertilizer.date_expiry, fertilizer.stock, fertilizer.price, fertilizer.availability,fertilizer.image, fertilizer.name, fertilizer.category, fertilizer.med_desc], function(status){
			callback(status);
		});
	},
	updateStock: function(data, callback){
		var sql = "update fertilizers set stock=? where fert_id=?";
		db.execute(sql, [data.stock, data.fert_id], function(status){
			callback(status);
		});
	},
	updateMedInfo: function(user, callback){
		var sql = "UPDATE fertilizers SET man_id= ? , fert_type= ? , fert_mfd= ? , fert_expiry= ? , stock= ? , image= ?, price_per_unit= ?, availability= ?, fert_name= ?, fert_category= ?, fert_desc= ?  where fert_id= ?";
		db.execute(sql, [user.result.man_id, user.result.type,user.result.date_mfd, user.result.date_expiry, user.result.stock, user.result.image, user.result.price, user.result.availability, user.result.name, user.result.category, user.result.description, user.id], function(status){
			callback(status);
		});
	},
	delete: function(fertId, callback){
		var sql = "delete from fertilizers where fert_id=?";
		db.execute(sql, [fertId], function(status){
			callback(status);
		});
	},

}



