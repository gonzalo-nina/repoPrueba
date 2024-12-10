// src/types/index.ts
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'patient';
  }
  
  export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
  }
  
  export interface Patient extends User {
    medications: Medication[];
  }