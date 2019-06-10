const bcrypt = require('bcrypt');

module.exports = {
    register: ( req, res, next ) => {
        const { username, password, email } = req.body
        const db = req.app.get('db')

        db.user_exists(email).then(foundUser => {
            if(foundUser.length){
                res.status(200).send('Email already existing! Please use another email')
            } else {
                const saltRounds = 12;
                bcrypt.genSalt(saltRounds).then( (salt) => {
                    bcrypt.hash(password, salt).then(hashedPassword => {
                        db.register([username, hashedPassword, email]).then((createUser) => {
                            req.session.user = createUser[0]
                            res.status(200).send(req.session.user);
                        })
                    })
                })
            }
        })
    },

    login: ( req, res, next ) => {
        const { username, password } = req.body
        const db = req.app.get('db')

        db.user_exists(username).then(username).then(userFound => {
            if(!userFound){
                res.status(200).then('Incorrect email/password');
            } else {
                bcrypt.compare(password, userFound[0].password).then(matchedPassword => {
                    if(matchedPassword){
                        req.session.user = userFound[0]
                        res.status(200).send(req.session.user);
                    } else {
                        res.status(200).send('Incorrect password');
                    }
                })
            }
        })
    }



}