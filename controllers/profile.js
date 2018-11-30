const handleProfileGet = (req, res, db) => {
    
    const { id } = req.params;
    //exit loop after sending response
    let found = false;
    db.select('*').from('users').where({id})
    .then(user => {
        //if no user, then empty array return which is true in js, so account for looking for nonexisting user with condition check
        if(user.length){
            res.json(user[0]);
        } else {
            res.status(400).json('Not Found');
        }
        
    })
    .catch(err => res.status(400).json('Error getting user'));
};

module.exports = {
    handleProfileGet
}
