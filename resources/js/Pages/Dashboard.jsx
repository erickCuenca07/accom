import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SurveyForm from '@/Accom/SurveryForm';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({ surveys,permissions }) {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editSurvey, setEditSurvey] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteSurvey, setDeleteSurvey] = useState(null);
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSurveyCreated = (message,newSurvey) => {
        toast.success(message);
        surveys.push(newSurvey);
        handleClose();
    };
    const columns = [
        { field: "DNICliente", headerName: "DNICliente", width: 100 },
        { field: "Producto", headerName: "Producto", width: 90 },
        { field: "SubProducto", headerName: "SubProducto", width: 130 },
        { field: "SubProductoGas", headerName: "SubProductoGas", width: 140 },
        { field: "Mantenimiento", headerName: "Mantenimiento", width: 130 },
        {
            field: "MantenimientoGas",
            headerName: "MantenimientoGas",
            width: 170,
        },
        { field: "Estado", headerName: "Estado", width: 130 },
        {
            field: "Acciones",
            headerName: "Acciones",
            width: 200,
            renderCell: (params) => (
                <div>
                    {permissions.includes('editar-encuestas') && (
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={() => editSurveyForm(params.row)}
                        >
                        Editar
                        </Button>
                    )}
                    {permissions.includes('eliminar-encuestas') && (
                        <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => openModalDelete(params.row.id)}
                        style={{ marginLeft: '5px' }}
                        >
                        Borrar
                        </Button>
                    )}
                    
                </div>
            ),
        },
    ];
    const rows = surveys.map((survey) => ({
        id: survey.id,
        DNICliente: survey.dniClient,
        Producto: survey.product,
        SubProducto: survey.subproduct,
        SubProductoGas: survey.subProductGas,
        Mantenimiento: survey.maintenance,
        MantenimientoGas: survey.maintenanceGas,
        Estado: survey.state
    }));
    const editSurveyForm = (row) => {
        setEditSurvey(row);
        setEditOpen(true)
    };

    const openModalDelete = (id) => {
        setDeleteSurvey(id);
        setDeleteOpen(true);
    };
    const deleteSurveyForm = (id) => {
        axios.delete(`/deleteSurvey/${id}`)
        .then((response) => {
            toast.success(response.data.message);
            setDeleteOpen(false);
            const index = surveys.findIndex((survey) => survey.id === id);
            if (index !== -1) {
                surveys.splice(index, 1);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
        
    };
    const ReplaceSurvey = (item) => {
        const index = surveys.findIndex((survey) => survey.id === item.id);
        if (index !== -1) {
            surveys[index] = item;
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white-800 dark:text-gray-200">
                    Prueba Accom
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-white-800">
                        <div className="p-6 text-gray-900 dark:text-white-100">
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid size={2}>
                                        Listado de Encuestas
                                    </Grid>
                                    <Grid size={2}>
                                        <Button variant="contained" onClick={handleOpen}>Crear encuesta</Button>
                                    </Grid>
                                </Grid>  
                            </Box>
                            <Box>
                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid size={12}>
                                        <Paper sx={{ height: 400, width: '100%' }}>
                                            {rows.length > 0 ? (
                                                <DataGrid
                                                    rows={rows}
                                                    columns={columns}
                                                    pageSize={5}
                                                    rowsPerPageOptions={[5]}
                                                />
                                            ) : (
                                                <Typography variant="h6" align="center">
                                                    No hay datos disponibles para mostrar.
                                                </Typography>
                                            )}
                                        </Paper>
                                    </Grid>
                                </Grid>  
                            </Box>
                            
                            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                                <DialogTitle>Crear Nueva Encuesta</DialogTitle>
                                <DialogContent>
                                    <SurveyForm onSurveyCreated={handleSurveyCreated} />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} variant="contained" color="warning">
                                        Cancelar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <ToastContainer />

                            <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="md">
                                <DialogTitle>Editar Encuesta</DialogTitle>
                                <DialogContent>
                                    {editSurvey && (
                                        <SurveyForm 
                                            initialData={editSurvey}
                                            onSurveyUpdated={(message, updatedSurvey) => {
                                                toast.success(message);
                                                ReplaceSurvey(updatedSurvey);
                                                setEditOpen(false);
                                            }}
                                        />
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setEditOpen(false)} variant="contained" color="warning">
                                        Cancelar
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} fullWidth maxWidth="md">
                                <DialogTitle>Borrar Encuesta</DialogTitle>
                                <DialogContent>
                                    <p>¿Esta seguro de borrar esta encuesta?</p>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setDeleteOpen(false)} variant="contained" color="warning">
                                        Cancelar
                                    </Button>
                                    <Button onClick={() => deleteSurveyForm(deleteSurvey)} variant="contained" color="error">
                                        Borrar
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
