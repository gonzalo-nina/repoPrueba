// src/components/AddMedicationForm.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { Medication } from '../types';

const Form = styled.form`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  margin: 0.5rem 0;
  font-size: 0.875rem;
`;

interface Props {
  patientId: string;
  onAdd: (medication: Omit<Medication, 'id'>) => void;
}

const AddMedicationForm = ({ onAdd }: Props) => {
  const [medication, setMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: ''
  });
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!medication.name || !medication.dosage || !medication.frequency || 
        !medication.startDate || !medication.endDate) {
      setError('All fields are required');
      return false;
    }
    if (new Date(medication.endDate) < new Date(medication.startDate)) {
      setError('End date must be after start date');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (validateForm()) {
      onAdd(medication);
      setMedication({
        name: '',
        dosage: '',
        frequency: '',
        startDate: '',
        endDate: ''
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Medication Name"
        value={medication.name}
        onChange={e => setMedication({...medication, name: e.target.value})}
      />
      <Input
        placeholder="Dosage"
        value={medication.dosage}
        onChange={e => setMedication({...medication, dosage: e.target.value})}
      />
      <Input
        placeholder="Frequency"
        value={medication.frequency}
        onChange={e => setMedication({...medication, frequency: e.target.value})}
      />
      <Input
        type="date"
        value={medication.startDate}
        onChange={e => setMedication({...medication, startDate: e.target.value})}
      />
      <Input
        type="date"
        value={medication.endDate}
        onChange={e => setMedication({...medication, endDate: e.target.value})}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit">Add Medication</Button>
    </Form>
  );
};

export default AddMedicationForm;