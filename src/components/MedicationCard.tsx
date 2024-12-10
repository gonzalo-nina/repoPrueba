// src/components/MedicationCard.tsx
import styled from 'styled-components';
import { Medication } from '../types';

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1.25rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const MedicationInfo = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const MedicationName = styled.h3`
  color: #2c3e50;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.span`
  color: #7f8c8d;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.span`
  color: #34495e;
  font-size: 0.9rem;
  font-weight: 500;
`;

const MedicationCard = ({ medication }: { medication: Medication }) => (
  <Card>
    <MedicationInfo>
      <MedicationName>{medication.name}</MedicationName>
      <InfoGrid>
        <InfoItem>
          <Label>Dosage</Label>
          <Value>{medication.dosage}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Frequency</Label>
          <Value>{medication.frequency}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Start Date</Label>
          <Value>{new Date(medication.startDate).toLocaleDateString()}</Value>
        </InfoItem>
        <InfoItem>
          <Label>End Date</Label>
          <Value>{new Date(medication.endDate).toLocaleDateString()}</Value>
        </InfoItem>
      </InfoGrid>
    </MedicationInfo>
  </Card>
);

export default MedicationCard;