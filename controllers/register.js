const handleRegister = (req, res, db, bcrypt) => {

    const {email, name, password} = req.body;

    if(!email || !name || !status) {
        return res.status(400).json('incorrect form submission!');
    }
    //sync hashing
    const hash = bcrypt.hashSync(password);

    //enact transaction to ensure consistency of data with multiple db operations, if one fails, all fail
    //user transaction for 1+ db actions
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*') //return all columns
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]); 
            })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })  
    .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    handleRegister: handleRegister
}