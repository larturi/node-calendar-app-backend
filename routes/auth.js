
/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

// Registro
router.post('/new', 
            [ // Middlewares
                check('name', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6}),
                validarCampos
            ], 
            crearUsuario
);

// Login
router.post('/', 
       [ // Middlewares
         check('email', 'El email es obligatorio').isEmail(),
         check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6}),
         validarCampos
       ],
       loginUsuario
);

// Renovar Token
router.get('/renew', validarJWT, renewToken);

module.exports = router;