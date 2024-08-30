export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  image?: string;
  emailVerified: Date;
  oneTimePassword?: string;
  profile?: Profile;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;

  bio?: string;

  createdAt: Date;
  updatedAt: Date;
}
