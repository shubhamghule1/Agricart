var db = require('./db');

module.exports={
	get: function(userId, callback){
		var sql = "select * from users where user_id=?";

		db.getResult(sql, [userId], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getAllUsers: function(callback){
		var sql = "select * from users order by user_id asc";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	insertUser: function(user, callback){
		// console.log(user);
		var sql = "insert into users(user_name,user_username,user_contact,user_email,user_password,user_type) values (?, ?, ?, ?, ?, ?)";
		db.execute(sql, [user.name, user.username, user.contact, user.email, user.password, user.usertype], function(status){
			callback(status);
		});
	},
	validate: function(user, callback){
		var sql = "select * from users where user_username=? and user_password=?";

		db.getResult(sql, [user.uname, user.password], function(result){
			callback(result);
		});
	},
	checkUser: function(user, callback){
		var sql = "select * from users where user_username=?";

		db.getResult(sql, [user.username], function(result){
			callback(result);
		});
	},
	update: function(user, callback){
		var sql = "update users set user_name=?, user_email=?, user_password=?, user_type=? where user_id=?";
		db.execute(sql, [user.result.name, user.result.email, user.result.password, user.result.type, user.id], function(status){
			callback(status);
		});
	},
	updateProfile: function(user, callback){
		var sql = "update users set user_name=?,user_password=?, user_contact= ?, user_email=? where user_id=?";
		db.execute(sql, [user.name, user.password, user.contact, user.email, user.id], function(status){
			callback(status);
		});
	},
	delete: function(userId, callback){
		var sql = "delete from users where user_id=?";
		db.execute(sql, [userId], function(status){
			callback(status);
		});
	}
}



