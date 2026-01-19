import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.phone, formData.password);
      }
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });
      
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || 'Google login failed');
    }
  };

  const handleGoogleError = () => {
    alert('Google login failed. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ☂️ RainShield
          </h1>
          <p className="text-gray-600 text-lg font-light">
            Hey there! Ready to stay dry? 🌧️
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          
          {!isLogin && (
            <input
              type="tel"
              placeholder="Phone Number"
              className="input-field"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          )}
          
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Just a sec...' : (isLogin ? 'Let me in!' : 'Join the club!')}
          </button>
        </form>

        <div className="my-6 text-center text-gray-500 font-medium">OR</div>

        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="filled_blue"
            size="large"
            text="continue_with"
            shape="rectangular"
          />
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-purple-600 font-medium transition-colors duration-200"
          >
            {isLogin ? "New here? Join us!" : "Already a member? Welcome back!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
