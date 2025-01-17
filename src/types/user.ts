export interface UserProfile {
  id: number;
  email?: string; 
  userName: string;
  fullName: string;
  password?: string; 
  profile?: {
    avatar?: string;
    bio?: string;
    cover?: string | null;
  };
  createdAt?: Date; 
  updatedAt?: Date; 
}
