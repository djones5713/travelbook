// const users = require("")
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');


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
        const { email, password } = req.body
        let userFound = await req.app.get('db').user_exists([email]);
        // console.log(password)
        console.log('User Found', userFound)
        const user = userFound[0]
        // console.log('user', user)
       try {

            if(!user){
                 console.log('not user if block ran')
                res.status(201).send('User not found. Please create an account.')
            } else{
                const isAuth = bcrypt.compareSync(password, user.password);
                console.log(user.password, password)
                console.log('compared passwords',isAuth)
                if(!isAuth) {
                    console.log('not isAuth')
                    res.status(201).send('Incorrect password');

                    } else {
                        console.log('request success')
                    req.session.user = { username: user.username, user_id: user.user_id };
                    console.log(user)
                    res.status(200).send(req.session.user);
                    
                    }
            }
        } catch (error) {
            console.log('caught error', error)
            res.status(409).send( 'User not found. Please create an account.');
        } 
        
    },


    

    userInfo: (req, res) => {
        res.status(200).send(req.session.user);
    },

    logout: ( req, res) => {
        req.session.destroy()
        res.status(200).send('logged out')
    },

   cloud: (req, res) => {
       const timestamp = Math.round((new Date()).getTime()/ 1000);

       const api_secret = process.env.CLOUDINARY_SECRECT_API;

       const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);

       const payload = {
           signature: signature,
           timestamp: timestamp
       };

       res.json(payload);
   }



}