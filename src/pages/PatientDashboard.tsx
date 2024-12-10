// src/pages/PatientDashboard.tsx
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Medication } from '../types';
import MedicationCard from '../components/MedicationCard';

const Dashboard = styled.div`
  padding: 2rem;
`;

const MedicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((u: any) => u.id === user?.id);
    if (currentUser?.medications) {
      setMedications(currentUser.medications);
    }
  }, [user?.id]);

  return (
    <Dashboard>
      <Header>
        <h1>Welcome, {user?.name}</h1>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Header>
      <MedicationGrid>
        {medications.map(medication => (
          <MedicationCard key={medication.id} medication={medication} />
        ))}
      </MedicationGrid>
    </Dashboard>
  );
};

export default PatientDashboard;