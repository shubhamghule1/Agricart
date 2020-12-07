var db = require('./db');

module.exports={
	get: function(manId, callback){
		var sql = "select * from manufacturers where man_id=?";

		db.getResult(sql, [manId], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from manufacturers";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getAllManufacturer: function(callback){
		var sql = "select * from manufacturers order by man_id asc";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	insertManufacturer: function(manufacturer, callback){
		// console.log(manufacturer);
		var sql = "insert into manufacturers(man_name,man_address,man_license) values (?, ?, ?)";
		db.execute(sql, [manufacturer.manName, manufacturer.manAddress, manufacturer.manLicense], function(status){
			callback(status);
		});
	},
	checkManufacturer: function(manufacturer, callback){
		var sql = "select * from manufacturers where man_name=?";
        // console.log("man in man model",manufacturer)
		db.getResult(sql, [manufacturer.manName], function(result){
			callback(result);
		});
	},
	update: function(manufacturer, callback){
		var sql = "update manufacturers set man_name=?, man_address=? where man_id=?";
		db.execute(sql, [manufacturer.result.manName, manufacturer.result.manAddress, manufacturer.id], function(status){
			callback(status);
		});
	},
	delete: function(manId, callback){
		var sql = "delete from manufacturers where man_id=?";
		db.execute(sql, [manId], function(status){
			callback(status);
		});
	}
}