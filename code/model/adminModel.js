var db = require('./db');

module.exports={
	getUsers: function(callback){
		var sql = "SELECT COUNT(*) as count FROM users WHERE deletedAt is NULL";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	validate: function(user, callback){
		var sql = "select * from users where user_username=? and user_password=?";
		// console.log(user);

		db.getResult(sql, [user.uname, user.password], function(result){
			callback(result);
		});
	},
	
}



