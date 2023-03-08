export interface DriverData {
  name: string;
  points: number;
}

export interface TeamData {
  drivers: DriverData[];
  total: number;
}

export interface LoaderResponse {
  erin: TeamData;
  andrew: TeamData;
  season: string;
}
