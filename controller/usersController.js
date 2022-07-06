const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/User')

module.exports.register = async (req,res) => {
    const { name, lastName, email, password, role } = req.body;
    console.log(name)


    const salt =  bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    const hash =  bcrypt.hashSync(password, salt);

    const user = new Usuario({
        name,
        lastName,
        email,
        password:hash,
        role: role || "user"
    });
    console.log(user)
     await user.save()
     .then((newUser) => {
        console.log(newUser.name)
        const payload = {
            id: newUser._id,
            role: newUser.role,
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.status(200).json({ token });
     })
     .catch((err)=>{
        res.status(500).json({
            message:"Error al registrar al usuario",
            err,
        })
     })
};

//Login de ususarios
    
module.exports.login = async (req,res) => {
    const { email , password } = req.body;

    Usuario.findOne({ email })
    .then((user) => {
        if (!user) {
            return res.status(401).json({
                message: "Usuario no encontrado"
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                message:"Email or password is wrong"
            })
        }
    const payload = {
        id: user._id,
        role: user.role
    }
    const token = jwt.sign(payload,process.env.SECRET_KEY)
    
    res.status(200).json({token})

    })
}

//get users
module.exports.getUsers = function(req, res) {
    Usuario.find({ })
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({error}));
}