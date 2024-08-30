import getCurrentUser from '@/actions/getCurrentUser'
import Profile from './Profile'
import { redirect } from 'next/navigation';
import React from 'react'
import { User } from '@/types/user';

const Page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/signin');
  }
  return (
    <Profile currentUser={currentUser as User} />
  )
}

export default Page