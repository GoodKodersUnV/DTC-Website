import  {db } from '@/lib/db';


export const signin = async (username: string, password: string) => {
  const user = await db.user.findFirst({
    where: {
      username,
      password,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};