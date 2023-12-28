import { useState } from 'react';
import axios from 'axios';
import { loginRoute, registerRoute } from '../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate()

  const handleRegister = async () => {
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!capitalLetterRegex.test(password) || !specialCharacterRegex.test(password)) {
      setPasswordError('Password should contain at least one capital letter and one special character');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const response = await axios.post(registerRoute, {
        username,
        password,
      });
      console.log('Registration successful:', response.data);
      setIsRegistered(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };


  const handleLogin = async () => {
    try {
      const response = await axios.post(loginRoute, {
        username,
        password,
      });

      console.log('Login successful:', response.data);

      // Assuming the response has keys 'token' and 'user_id'
      const { token, user_id } = response.data;

      // Store token and user_id in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);

      navigate("/home")

      // Perform further actions like redirection or state updates
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 lg:w-1/3">
          <h2 className="text-3xl mb-6 text-center font-semibold">
            {isRegistered ? 'Login' : 'Register'}
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {passwordError && (
              <p className="text-red-500 text-sm absolute">{passwordError}</p>
            )}
          </div>
          {isRegistered ? (
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleRegister}
              className="w-full bg-green-500 text-white rounded p-2 hover:bg-green-600"
            >
              Register
            </button>
          )}
          <p
            onClick={() => setIsRegistered((prev) => !prev)}
            className="text-center mt-4 cursor-pointer text-blue-500"
          >
            {isRegistered ? 'Create an account' : 'Already have an account?'}
          </p>
        </div>
      </div>
    </>

  );
};

export default Auth;
