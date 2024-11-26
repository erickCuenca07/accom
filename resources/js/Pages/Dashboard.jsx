import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SurveyForm from '@/Accom/SurveryForm';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import axios from 'axios';


export default function Dashboard() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                            
                            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                                <DialogTitle>Crear Nueva Encuesta</DialogTitle>
                                <DialogContent>
                                    <SurveyForm />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} variant="contained" color="warning">
                                        Cancelar
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
