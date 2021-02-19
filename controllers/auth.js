const { response } = require('express');
const { validationResult } = require('express-validator');

const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email: '' });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            });
        }
        usuario = new Usuario( req.body );
        await usuario.save();
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactar al administrador'
        });
    }

};

const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    // Login correcto
    res.status(200).json({
        ok: true,
        msg: 'Login',
        email,
        password
    });
}

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Renew'
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
};
