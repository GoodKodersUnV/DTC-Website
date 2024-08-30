import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';

const SigninWithGoogle = () => {
  const router = useRouter();
  const loginWithGoogle = async () => {
    const response = await signIn('google', { callbackUrl: '/' });
    if (response?.ok) {
      toast.success('Signin successful');
      router.push('/');
    }
    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <div className=''>
      <h2 className="text-center mt-2 text-secondary text-sm font-bold">Or</h2>
      <button onClick={(e) => { e.preventDefault(); loginWithGoogle() }} className='bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold my-2  rounded-lg w-full  '>
        <div className='flex rounded-md justify-center items-center gap-5 p-2.5 relative bg-secondary'>
          <div>
            <FcGoogle />
          </div>
          Continue with Google
        </div>
      </button>
    </div>
  );
};

export default SigninWithGoogle;
