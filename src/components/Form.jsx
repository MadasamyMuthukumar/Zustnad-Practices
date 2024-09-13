// import React, { useState } from 'react';
// import { Lock, User } from 'lucide-react';

// const Form = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log('Login attempt', { username, password, rememberMe });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-purple-900 bg-opacity-80 relative overflow-hidden">
//       {/* Background with stars */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="stars absolute inset-0"></div>
//       </div>
      
//       {/* Trees silhouette */}
//       <div className="absolute bottom-0 left-0 right-0">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-purple-950">
//           <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,128C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
//         </svg>
//       </div>
      
//       {/* Login form */}
//       <div className="bg-purple-800 bg-opacity-50 p-8 rounded-lg shadow-lg w-96 z-10">
//         <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4 relative">
//             <User className="absolute top-3 left-3 text-purple-300" size={20} />
//             <input
//               type="text"
//               className="w-full py-2 pl-10 pr-3 bg-purple-700 bg-opacity-50 text-white placeholder-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-6 relative">
//             <Lock className="absolute top-3 left-3 text-purple-300" size={20} />
//             <input
//               type="password"
//               className="w-full py-2 pl-10 pr-3 bg-purple-700 bg-opacity-50 text-white placeholder-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center justify-between mb-6">
//             <label className="flex items-center text-purple-200">
//               <input
//                 type="checkbox"
//                 className="mr-2"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               Remember me
//             </label>
//             <a href="#" className="text-purple-200 hover:text-white">Forgot password?</a>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center text-purple-200 mt-4">
//           Don't have an account? <a href="#" className="text-white hover:underline">Register</a>
//         </p>
//       </div>

//       <style jsx>{`
//         .stars {
//           background-image: 
//             radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
//             radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
//             radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
//             radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
//             radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
//             radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
//           background-repeat: repeat;
//           background-size: 200px 200px;
//           animation: twinkle 5s infinite;
//         }

//         @keyframes twinkle {
//           0% { opacity: 0.7; }
//           50% { opacity: 0.9; }
//           100% { opacity: 0.7; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Form;