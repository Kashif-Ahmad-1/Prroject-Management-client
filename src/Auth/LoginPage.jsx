// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './loginform.css';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [popupStyle, showPopup] = useState('hide');
//   const navigate = useNavigate(); // Using useNavigate hook

//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     try {
//       // Send login request to the backend
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  
//       // Check if the response contains both the token and the user data
//       const { token, user } = response.data;
  
//       if (!token || !user) {
//         setError('Login failed: Missing token or user data.');
//         return;
//       }
  
//       // Store the JWT token in localStorage
//       localStorage.setItem('authToken', token);
  
//       // Redirect to the appropriate dashboard based on the role
//       if (user.role === 'admin') {
//         navigate('/admin-dashboard');
//       } else if (user.role === 'developer') {
//         navigate('/developer-dashboard');
//       } else if (user.role === 'supervisor') {
//         navigate('/supervisor-dashboard');
//       } else {
//         setError('Invalid role');
//       }
//     } catch (err) {
//       // This will catch both invalid credentials and other server issues
//       setError('Invalid credentials or server error');
//     }
//   };
  

//   const popup = () => {
//     showPopup('login-popup');
//     setTimeout(() => showPopup('hide'), 3000);
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h1>Login</h1>
//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleLogin} className="login-form">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="input-field"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input-field"
//           />
//           <button type="submit" className="login-btn">Login</button>
//         </form>

//         <div className={popupStyle}>
//           <h3>Login Failed</h3>
//           <p>Username or password incorrect</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import { useState } from "react";
import { Link } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [popupStyle, showPopup] = useState('hide');
  const navigate = useNavigate(); // Using useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  
      // Check if the response contains both the token and the user data
      const { token, user } = response.data;
  
      if (!token || !user) {
        setError('Login failed: Missing token or user data.');
        return;
      }
  
      // Store the JWT token in localStorage
      localStorage.setItem('authToken', token);
  
      // Redirect to the appropriate dashboard based on the role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'developer') {
        navigate('/developer-dashboard');
      } else if (user.role === 'supervisor') {
        navigate('/supervisor-dashboard');
      } else {
        setError('Invalid role');
      }
    } catch (err) {
      // This will catch both invalid credentials and other server issues
      setError('Invalid credentials or server error');
    }
  };
  

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center gap-8 lg:gap-16">
        {/* Left side - Branding */}
        <div className="hidden md:flex flex-col flex-1">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm text-blue-500">
              Manage all your tasks in one place!
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-blue-600 lg:text-6xl">
              Cloud-based
              <br />
              Task Manager
            </h1>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-[400px]">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
            <div className="space-y-2 mb-6">
              <h2 className="text-3xl font-semibold text-blue-600">Welcome back!</h2>
              <p className="text-gray-600">Keep all your credentials safe!</p>
            </div>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="password"
                  required
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-right">
                <Link
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  to="#"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md"
                type="submit"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
