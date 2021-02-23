/*
    Rutas de Eventos
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { isDate } = require('../helpers/isDate');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

// Valido JWT para todas las rutas
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos);

// Crear un evento
router.post('/', 
            [
                check('title', 'El titulo es obligatorio').not().isEmpty(),
                check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
                check('end', 'Fecha de fin es obligatoria').custom( isDate ),
                validarCampos
            ],
            crearEvento),

// Actualizar un evento
router.put('/:id', actualizarEvento),

// Eliminar un evento
router.delete('/:id', eliminarEvento),

module.exports = router;