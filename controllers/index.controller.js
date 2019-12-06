const { Pool } = require('pg');

//Configuracion BD
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'johanandres2',
    database: 'prueba',
    port: '5432'
});

const getEmpresas = async (req, res) => {
    const respuesta = await pool.query('SELECT * FROM empresa');
    res.status(200).json(respuesta.rows);
}

const createEmpresas = async (req, res) =>{
    const { idempresa, empnombre, empdescripcion, telefono } = req.body;
    
    const response = await pool.query('INSERT INTO empresa VALUES($1, $2, $3, $4)', [idempresa, empnombre, empdescripcion, telefono]);
    console.log(response);
    
    res.json({
        message: "Empresa Registrada Satisfactoriamente",
        body: {
            empresa: {idempresa, empnombre, empdescripcion, telefono}
        }
    });
};

const getEmpresaById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM empresa WHERE idempresa = $1', [id]);
    
    res.json(response.rows);
};

const updateEmpresa = async (req, res) => {
    const id = req.params.id;
    const { empnombre, empdescripcion, telefono } = req.body;
    
    const response = await pool.query('UPDATE empresa SET empnombre = $1, empdescripcion = $2, telefono = $3 WHERE idempresa = $4', 
    [empnombre, empdescripcion, telefono, id]);
    
    console.log(response);
    res.json('Empresa Actualizada Satisfactoriamente');
};

const deleteEmpresa = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM empresa WHERE idempresa = $1', [id])
    
    console.log(response);
    res.json(`Empresa ${id} Eliminada Satisfactoriamente`);
};

module.exports = { getEmpresas,
    createEmpresas,
    getEmpresaById,
    updateEmpresa,
    deleteEmpresa
};