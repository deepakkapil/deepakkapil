let express = require('express')
let app = express()

let Users = require('./models/usersschema')
// let client=require('./models/clients')
let client = require('./models/clients')
require('./db/conn')
let bcrypt = require('bcrypt');

let cors = require('cors')
var jwt = require('jsonwebtoken');




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.post('/register/mongo', async (req, res) => {



    try {
        let user = new Users(req.body);
        let createuser = await user.save();
        res.status(201).send(createuser);
        console.log(res);

    } catch (error) {
        res.status(400).send(error)

    }


})

app.post("/sign-up", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database


        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            try {
                let client_ = new client({
                    email: req.body.email,
                    password: hash,

                });
                let sign_up_client = await client_.save()
                res.status(200).send(sign_up_client);
                console.log("message: user created", sign_up_client);
            }
            catch (err) {
                console.log('error logged:', err);
            }
            if (err) {
                console.log("error from bycrpt", err);
            }


        })




        //   if (client && (await bcrypt.compare(password, client.password))) {
        //     // Create token
        //     const token = jwt.sign(
        //       { user_id: user._id, email },
        //       process.env.TOKEN_KEY,
        //       {
        //         expiresIn: "2h",
        //       }
        //     );

        //     // save user token
        //     user.token = token;

        //     // user
        //     res.status(200).json(user);
        //   }


    } catch (err) {
        console.log("error", err);
    }
    // Our register logic ends here
});


app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const client__ = await client.findOne({ email });

        if (client__ || (await bcrypt.compare(req.body.password, client__.password))) {
            // Create token
            let token = jwt.sign(
                { user_id: client__._id, email },
                'qwerty',
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            token = token;

            // user
            res.status(200).json({ token: token });
            console.log(await bcrypt.compare(req.body.password, client__.password), "hash-pass");
            console.log('req structure');
        }
        else {
            await res.status(400).send("Invalid Credentials");

        }
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

app.get('/register/mongo', async (req, res) => {

    try {
        let token = req.headers.authorization
        let verifying_token = jwt.verify(token, 'qwerty')
        console.log("verifying_token", verifying_token);
        try {

            let users = await Users.find();
            res.send(users)
            console.log("req_from*************", req.headers.authorization);
        } catch (error) {
            res.send(error)

        }

    }
    catch (err) {
        console.log(err, 'token error');
    }


   
        

   


})

app.get('/register/mongo/:id', async (req, res) => {
    try {
        let _id = req.params.id;
        let user = await Users.findById(_id)
        res.send(user)


    } catch (error) {
        res.send(error)

    }
})


app.patch('/register/mongo/:id', async (req, res) => {

    try{
        let token = req.headers.authorization
        let verifying_token = jwt.verify(token, 'qwerty')
        try {
        
            let updateuser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.send(updateuser)
        } catch (e) {
            res.status(404).send(updateuser)
    
        }
    }
    catch (err){
        console.log('token error',err);

    }
   

})

app.delete('/register/mongo/:id', async (req, res) => {
    try {
        let deleteUser = await Users.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            res.status(400).send();
        }
        res.send(deleteUser)
    } catch (error) {
        res.status(500).send(error);

    }

})




app.listen(9000, () => {
    console.log('running at 9000');
})