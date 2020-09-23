const express = require('express');
const app = express();

app.use('/api/auth/', require('./auth'));
app.use('/api/usuario', require('./usuarios'));
app.use('/api/artefacto', require('./artefactos'));
app.use('/api/modelo', require('./modelos'));
app.use('/api/formulario', require('./formularios_sertec'));

module.exports = app;