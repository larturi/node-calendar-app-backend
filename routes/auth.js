
/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');

// Registro
router.post('/new', 
            [ // Middlewares
                check('name', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6}),
            ], 
            crearUsuario
);

// Login
router.post('/', 
       [ // Middlewares
         check('email', 'El email es obligatorio').isEmail(),
         check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6}),
       ],
       loginUsuario
);

// Renovar Token
router.get('/renew', renewToken);

module.exports = router;