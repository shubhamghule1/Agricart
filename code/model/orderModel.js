var db = require('./db');

module.exports={

	get: function(userId, callback){
		var sql = "select * from order_details as od left join fertilizers as f on od.fert_id=f.fert_id where user_id=? order by orderDate desc";
		// console.log(name);
		db.getResult(sql, [userId], function(result){
			// console.log("result", result);
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from order_details";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	insertOrder: function(order, callback){
		var sql = "insert into order_details(user_id, fert_id, quantity, total_cost, alt_contact, pay_mode) values(?,?,?,?,?,?)";
		db.execute(sql, [order.uid, order.pid, order.quantity,order.total_cost, order.contact, order.payment_mode], function(status){
			callback(status);
		});
	}
}



