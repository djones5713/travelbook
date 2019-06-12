// const users = require("")
const bcrypt = require('bcrypt');


module.exports = {
    createAccount: async ( req, res ) => {
        console.log('create account end hit')
        const { username, password, email } = req.body
        const db = req.app.get('db')
        const resultEmail = await db.user_exists([email]);

        try {
            const existingEmail = resultEmail[0]; 
            if(existingEmail) {
                return res.status(409).send('Email already exist');
               
            } 

            let salt = bcrypt.genSaltSync(12);
            let hash = bcrypt.hashSync(password, salt);
            console.log(hash)
            let createUser = await db.create_account([username, hash, email ]);
            const user = createUser[0]
            req.session.user = {username: user.username, user_id: user.user_id, email: user.email}
    
            res.status(201).send(req.session.user)
        } catch (error) {
            res.status(409).send( 'Email already exist' );
        } 
      
    },

    login: async ( req, res) => {
        const { username, password } = req.body
        let userFound = await req.app.get('db').user_exists([username]);
        console.log(password)
        const user = userFound[0]
        console.log(user)
       try {

            if(!user){
                res.status(201).send('User not found. Please create an account.')
            }
            const isAuth = bcrypt.compareSync(password, user.password);
            console.log(user.password)
            console.log(isAuth)
            if(!isAuth) {
                return res.status(201).send('Incorrect password');
            }
            req.session.user = { username: user.username };
            return res.send(req.session.user);
        } catch (error) {
            res.status(409).send( 'User not found. Please create an account.');
        } 
        
    },

    userInfo: (req, res) => {
        res.status(200).send(req.session.user);
    },

    logout: async ( req, res) => {
        req.session.destroy()
        res.status(200).send('logged out')
    }



}