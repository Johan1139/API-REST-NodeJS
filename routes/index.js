const { Router } = require('express');
const router = Router();

const { getEmpresas, createEmpresas, getEmpresaById, updateEmpresa, deleteEmpresa } = require('../controllers/index.controller');

router.get('/empresas', getEmpresas);
router.get('/empresas/:id', getEmpresaById);
router.post('/empresas', createEmpresas);
router.put('/empresas/:id', updateEmpresa);
router.delete('/empresas/:id', deleteEmpresa);

module.exports = router;