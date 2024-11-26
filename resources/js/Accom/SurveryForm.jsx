import React, { useState } from 'react';
import { TextField,Select,MenuItem,FormControl,InputLabel,Button,FormHelperText} from '@mui/material';
import Grid from '@mui/material/Grid2';

const SurveyForm = () => {
  const [dni, setDni] = useState('');
  const [producto, setProducto] = useState('');
  const [subproducto, setSubproducto] = useState('');
  const [subproductoGas, setSubproductoGas] = useState('');
  const [mantenimiento, setMantenimiento] = useState('');
  const [mantenimientoGas, setMantenimientoGas] = useState('');
  const [estado, setEstado] = useState('');

  const [errors, setErrors] = useState({});

  const validateDni = (dni) => {
    const dniRegex = /^[XYZ]?\d{5,8}[A-Z]$/; // Regex simplificado para DNI/NIE
    return dniRegex.test(dni);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validación
    if (!dni || !validateDni(dni)) {
      newErrors.dni = 'DNI/NIE es obligatorio y debe tener un formato válido.';
    }
    if (!producto) {
      newErrors.producto = 'El producto es obligatorio.';
    }
    if (producto && !subproducto) {
      newErrors.subproducto = 'El subproducto es obligatorio.';
    }
    if (producto === 'DUAL') {
      if (!mantenimiento) {
        newErrors.mantenimiento = 'El mantenimiento LUZ es obligatorio.';
      }
      if (!mantenimientoGas) {
        newErrors.mantenimientoGas = 'El mantenimiento GAS es obligatorio.';
      }
    } else if (producto && !mantenimiento) {
      newErrors.mantenimiento = 'El mantenimiento es obligatorio.';
    }
    if (!estado) {
      newErrors.estado = 'El estado es obligatorio.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aquí puedes manejar el envío del formulario
      console.log('Formulario enviado', { dni, producto, subproducto, subproductoGas, mantenimiento, mantenimientoGas, estado });
    }
  };

  const handleProductoChange = (e) => {
    setProducto(e.target.value);
    setSubproducto('');
    setSubproductoGas('');
    setMantenimiento('');
    setMantenimientoGas('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <TextField
            label="DNI de cliente"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            error={!!errors.dni}
            helperText={errors.dni}
            fullWidth
            required
          />
        </Grid>

        <Grid size={4}>
          <FormControl fullWidth required error={!!errors.producto}>
            <InputLabel>Producto</InputLabel>
            <Select value={producto} onChange={handleProductoChange}>
              <MenuItem value=""><em>Seleccionar</em></MenuItem>
              <MenuItem value="LUZ">LUZ</MenuItem>
              <MenuItem value="GAS">GAS</MenuItem>
              <MenuItem value="DUAL">DUAL</MenuItem>
            </Select>
            <FormHelperText>{errors.producto}</FormHelperText>
          </FormControl>
        </Grid>

        {producto && (
          <Grid size={4}>
            <FormControl fullWidth required error={!!errors.subproducto}>
              <InputLabel>Subproducto</InputLabel>
              <Select
                value={subproducto}
                onChange={(e) => setSubproducto(e.target.value)}
              >
                {producto === 'LUZ' && [
                    <MenuItem value=""><em>Seleccionar</em></MenuItem>,
                    <MenuItem value="TARIFA PLANA">TARIFA PLANA</MenuItem>,
                    <MenuItem value="TARIFA POR USO">TARIFA POR USO</MenuItem>
                ]}

                {producto === 'GAS' && [
                    <MenuItem value=""><em>Seleccionar</em></MenuItem>,
                    <MenuItem value="PLENA">PLENA</MenuItem>,
                    <MenuItem value="TOTAL">TOTAL</MenuItem>
                ]}

                {producto === 'DUAL' && [
                    <MenuItem value=""><em>Seleccionar</em></MenuItem>,
                    <MenuItem value="TARIFA PLANA">TARIFA PLANA</MenuItem>,
                    <MenuItem value="TARIFA POR USO">TARIFA POR USO</MenuItem>
                ]}
                </Select>
                <FormHelperText>{errors.subproducto}</FormHelperText>
                </FormControl>
            </Grid>
        )}

        {producto === 'DUAL' && (
          <Grid size={4}>
            <FormControl fullWidth required error={!!errors.subproductoGas}>
              <InputLabel>Subproducto GAS</InputLabel>
              <Select
                value={subproductoGas}
                onChange={(e) => setSubproductoGas(e.target.value)}
              >
                <MenuItem value=""><em>Seleccionar</em></MenuItem>
                <MenuItem value="PLENA">PLENA</MenuItem>
                <MenuItem value="TOTAL">TOTAL</MenuItem>
              </Select>
              <FormHelperText>{errors.subproductoGas}</FormHelperText>
            </FormControl>
          </Grid>
        )}

        {producto && (
          <Grid size={4}>
            <FormControl fullWidth required error={!!errors.mantenimiento}>
              <InputLabel>Mantenimiento</InputLabel>
              <Select
                value={mantenimiento}
                onChange={(e) => setMantenimiento(e.target.value)}
              >
                <MenuItem value=""><em>Seleccionar</em></MenuItem>
                <MenuItem value="SI">SI</MenuItem>
                <MenuItem value="NO">NO</MenuItem>
              </Select>
              <FormHelperText>{errors.mantenimiento}</FormHelperText>
            </FormControl>
          </Grid>
        )}

        {producto === 'DUAL' && (
          <Grid size={4}>
            <FormControl fullWidth required error={!!errors.mantenimientoGas}>
              <InputLabel>Mantenimiento GAS</InputLabel>
              <Select
                value={mantenimientoGas}
                onChange={(e) => setMantenimientoGas(e.target.value)}
              >
                <MenuItem value=""><em>Seleccionar</em></MenuItem>
                <MenuItem value="SI">SI</MenuItem>
                <MenuItem value="NO">NO</MenuItem>
              </Select>
              <FormHelperText>{errors.mantenimientoGas}</FormHelperText>
            </FormControl>
          </Grid>
        )}

        <Grid size={4}>
          <FormControl fullWidth required error={!!errors.estado}>
            <InputLabel>Estado</InputLabel>
            <Select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <MenuItem value=""><em>Seleccionar</em></MenuItem>
              <MenuItem value="VENDIDO">VENDIDO</MenuItem>
              <MenuItem value="EN PROCESO">EN PROCESO</MenuItem>
              <MenuItem value="NO VENDIDO">NO VENDIDO</MenuItem>
              <MenuItem value="NO VÁLIDO">NO VÁLIDO</MenuItem>
            </Select>
            <FormHelperText>{errors.estado}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid size={4}>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SurveyForm;