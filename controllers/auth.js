const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generarJWT } = require('../helpers/jwt');

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

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactar al administrador'
        });
    }

};

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña incorrectos'
            });
        }

        // Confirmar el password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña incorrectos'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        // Login correcto
        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token 
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactar al administrador'
        });
    }

   
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    // Genera un nuevo JWT y lo retorna renovado
    const token = await generarJWT( uid, name );

    console.log(token);

    res.status(200).json({
        ok: true,
        uid: uid,
        name: name,
        token 
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
};
