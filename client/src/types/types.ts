export type StationType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

export type AvailabilityType = {
  employeeId: number;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
};
