const { response } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    // Manejo de errores de validación
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    // Registro correcto
    res.status(201).json({
        ok: true,
        msg: 'Registro',
        name,
        email,
        password
    });
};

const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    // Manejo de errores de validación
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

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
