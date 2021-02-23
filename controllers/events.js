const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');

const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name email');

    res.status(201).json({
        ok: true,
        eventos
    });
};

const crearEvento = async (req, res = response) => {

    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        
        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        console.log(error);
    }

    
};

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento inexistente'
            });
        } 
        
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(201).json({
            ok: true,
            evento: eventoActualizado
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        console.log(error);
    }
    
};

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento inexistente'
            });
        }
    
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            });
        }
    
        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
    
        res.status(201).json({
            ok: true,
            evento: eventoEliminado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        console.log(error);
    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};
