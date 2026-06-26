import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { PatientApi } from '@generated/axios';
import type { PatientDTO } from '@generated/axios';
import styles from './PatientsPage.module.scss';

interface PatientFilters {
  text: string;
  id: string;
  opd: string;
  idp: string;
  doctorId: string;
}

export const PatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const patientApi = new PatientApi();

  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PatientFilters>({
    text: '',
    id: '',
    opd: '',
    idp: '',
    doctorId: '',
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await patientApi.getListPatient(
        {
          text: filters.text || undefined,
          id: filters.id ? parseInt(filters.id) : undefined,
          opd: filters.opd ? parseInt(filters.opd) : undefined,
          idp: filters.idp ? parseInt(filters.idp) : undefined,
          doctorId: filters.doctorId ? parseInt(filters.doctorId) : undefined,
        },
        0,
        12,
        'id'
      );
      setPatients(response.data || []);
    } catch (err) {
      setError('Errore nel caricamento dei pazienti');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: keyof PatientFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    fetchPatients();
  };

  const handleAddNewPatient = () => {
    navigate('/patients/new');
  };

  const handlePatientClick = (patientId: number) => {
    navigate(`/patients/${patientId}`);
  };

  const formatPatientIdentifiers = (patient: PatientDTO): string => {
    const parts = [];
    if (patient.id) parts.push(`PID: ${patient.id}`);
    if (patient.opd) parts.push(`OPD: ${patient.opd}`);
    if (patient.idp) parts.push(`IDP: ${patient.idp}`);
    return parts.join(' | ');
  };

  return (
    <Container maxWidth="lg" className={styles.patientsPage}>
      <Box className={styles.header}>
        <Typography variant="h4" component="h1" className={styles.title}>
          PATIENTS DATABASE
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<AddIcon />}
          onClick={handleAddNewPatient}
          className={styles.addButton}
        >
          ADD NEW PATIENT
        </Button>
      </Box>

      <Card className={styles.filterCard}>
        <CardContent>
          <Typography variant="h6" className={styles.filterTitle}>
            FIND A PATIENT
          </Typography>
          <Typography variant="body2" color="textSecondary" className={styles.filterSubtitle}>
            Insert the information of patient
          </Typography>

          <Grid container spacing={2} className={styles.filterGrid}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                placeholder="Patient ID (PID)"
                value={filters.id}
                onChange={(e) => handleFilterChange('id', e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                placeholder="Outpatient Number (OPD)"
                value={filters.opd}
                onChange={(e) => handleFilterChange('opd', e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                placeholder="Inpatient Number (IDP)"
                value={filters.idp}
                onChange={(e) => handleFilterChange('idp', e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                endIcon={<SearchIcon />}
                onClick={handleSearch}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" className={styles.alert}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box className={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      )}

      {!loading && patients.length > 0 && (
        <Grid container spacing={3} className={styles.patientsGrid}>
          {patients.map((patient) => (
            <Grid item xs={12} sm={6} md={4} key={patient.id}>
              <Card
                className={styles.patientCard}
                onClick={() => handlePatientClick(patient.id!)}
              >
                <CardContent className={styles.patientContent}>
                  <Avatar
                    src={patient.avatar}
                    alt={`${patient.name} ${patient.surname}`}
                    className={styles.avatar}
                  />
                  <Typography variant="h6" className={styles.patientName}>
                    {patient.name} {patient.surname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatPatientIdentifiers(patient)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && patients.length === 0 && !error && (
        <Box className={styles.emptyState}>
          <Typography variant="body1" color="textSecondary">
            Nessun paziente trovato. Prova a modificare i filtri di ricerca.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default PatientsPage;