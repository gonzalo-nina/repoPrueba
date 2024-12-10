// src/pages/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Patient, Medication } from '../types';
import MedicationCard from '../components/MedicationCard';
import AddMedicationForm from '../components/AddMedicationForm';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 95%;
`;

const PatientGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const PatientCard = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(32, 107, 196, 0.15);
  }
`;

const PatientName = styled.h2`
  color: #1a365d;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
`;

const PatientEmail = styled.p`
  color: #4a5568;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
`;

const MedicationTitle = styled.h3`
  color: #2b6cb0;
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

const MedicationList = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 2px solid #e2e8f0;
`;

const PageTitle = styled.h1`
  color: #2b6cb0;
  margin: 0;
  font-size: 2rem;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #2c5282;
    transform: translateY(-1px);
  }
`;

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    setPatients(users.filter((user: Patient) => user.role === 'patient'));
  }, []);

  const handleAddMedication = (patientId: string, medication: Omit<Medication, 'id'>) => {
      const updatedPatients = patients.map(patient => {
        if (patient.id === patientId) {
          return {
            ...patient,
            medications: [...(patient.medications || []), {
              ...medication,
              id: crypto.randomUUID()
            } as Medication]
          };
        }
        return patient;
      });
      
      setPatients(updatedPatients);
      localStorage.setItem('users', JSON.stringify(updatedPatients));
    };

  return (
    <Dashboard>
      <Header>
        <PageTitle>Admin Dashboard</PageTitle>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Header>
      <PatientGrid>
        {patients.map(patient => (
          <PatientCard key={patient.id}>
            <PatientName>{patient.name}</PatientName>
            <PatientEmail>{patient.email}</PatientEmail>
            <MedicationTitle>Medications</MedicationTitle>
            <MedicationList>
              {patient.medications?.map(medication => (
                <MedicationCard key={medication.id} medication={medication} />
              ))}
            </MedicationList>
            <AddMedicationForm 
              patientId={patient.id}
              onAdd={(med) => handleAddMedication(patient.id, med)}
            />
          </PatientCard>
        ))}
      </PatientGrid>
    </Dashboard>
  );
};

export default AdminDashboard;