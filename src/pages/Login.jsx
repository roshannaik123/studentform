import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setLogin] = useState(true);
  const [user, setUser] = useState({ email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
const navigate=useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isLogin && user.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const url = isLogin
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/register";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Error occurred");
        return;
      }
      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email",user.email);
        // console.log("Logged in user:", data.user);
        alert("Login successful!");
        navigate("/dashboard")
      } else {
        console.log("Registered user:", data.user);
        alert("Registration successful! Please login.");
        setLogin(true); 
      }
      
      setUser({email:"",password:""})
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center bg-cyan-800 justify-center min-h-[100vh] p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-gray-700 font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 cursor-pointer rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-600">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setLogin((prev) => !prev)}
            className="text-blue-500 hover:underline cursor-pointer font-medium"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;