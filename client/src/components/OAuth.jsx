import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: tokenResponse.access_token }),
        });

        const data = await res.json();

        if (res.ok) {
          dispatch(signInSuccess(data));
          navigate('/');
        } else {
          dispatch(signInFailure(data.message || 'Failed to sign in'));
          console.error('Error from server:', data.message);
        }
      } catch (error) {
        dispatch(signInFailure(error.message));
        console.error('Error during Google sign-in:', error.message);
      }
    },
    onError: () => dispatch(signInFailure('Google sign-in failed')),
  });

  return (
    <Button
      outline
      color='purple'
      type='button'
      className='w-full mt-5'
      onClick={() => handleGoogleClick()}
    >
      <AiFillGoogleCircle className='w-6 h-6 mr-2' /> Continue With Google
    </Button>
  );
};

export default OAuth;
