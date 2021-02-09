const handleProfileGet = (req, res, db) => { //:id 파라미터 가져옴
	const { id } = req.params;
	// database.users.forEach(user => {
	// 	if(user.id === id){
	// 		found = true;
	// 		user.entries++
	// 		return res.json(user);
	// 	}
	// })
	db.select('*').from('users').where({
		id: id
	}).then(user => {
		if(user.length){
			res.json(user[0])
		} else {
			res.status(400).json('not found')
		}
		
	}).catch(err => res.status(400).json('error getting user'))
	// if(!found){
	// 	res.status(400).json('not found');
	// }
}

module.exports = {
	handleProfileGet: handleProfileGet
}