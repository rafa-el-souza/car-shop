export interface Vehicle {
  model: string; // >= 3
  year: number; // >= 1900 && <= 2022
  color: string; // >= 3
  status?: boolean;
  buyValue: number; 
}