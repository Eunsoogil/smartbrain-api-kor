const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if(!email || !name || !password){
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	// bcrypt.hash("bacon", null, null, function(err, hash) {
    	
	// });
	// database.users.push({
	// 	id: '',
	// 	name: name,
	// 	email: email,
	// 	password: password,
	// 	entries: 0,
	// 	joined: new Date()
	// })
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		}).into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			}).then(user => {
				res.json(user[0]);
			})			
		}).then(trx.commit)
		.catch(trx.rollback)
	}).catch(err => {
		res.status(400).json('unable to register') //존재할경우 400날림
	})
	// .returning('*') return all columns
}

module.exports = {
	handleRegister: handleRegister
}