export interface ProfileData {
  educationDetails?: string[];
  projects?: Project[];
}

export interface Project {
  name: string;
  isActive?: boolean;
  idField?: string;
}
