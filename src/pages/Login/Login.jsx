// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const imgUrl =
    "https://images.pexels.com/photos/29676866/pexels-photo-29676866/free-photo-of-majestic-view-of-prophet-s-mosque-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  // State for form inputs
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Navigation hook
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (you can replace this with your own validation logic)
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    // Redirect to dashboard (replace this with actual login API logic)
    console.log("Form Data Submitted:", formData);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto py-28 lg:py-40 px-4 lg:px-4">
      <div className="lg:flex justify-between overflow-hidden">
        <div className="w-full lg:w-[47%] mb-5 lg:mb-0 hover:scale-105 duration-300">
          <div
            style={{
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "500px",
            }}
            className="flex justify-center items-center bg-[rgb(0,0,0)]"
          >
            <div className="text-sky-500 bg-[rgba(0,0,0,0.5)] mx-16 p-5">
              <h1 className="text-3xl font-raleWay font-thin text-justify">
                Please, Login for going to the Dashboard and explore more
                information.
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[47%] border border-primary px-10">
          <div className="flex justify-center items-center">
            <div className="w-full">
              <h2 className="text-3xl py-8 text-center text-primary">Login</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="my-2 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email"
                  className="py-3 px-2 mb-5 w-full border focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                />

                <label htmlFor="password" className="my-2 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Your Password"
                  className="py-3 px-2 w-full border focus:outline-none focus:ring-1 focus:ring-focusInput focus:border-focusInput"
                />

                <div className="mt-10">
                  <Link to="/dashboard">
                  <button
                    type="submit"
                    className="px-12 py-2 w-full block text-center font-semibold text-white bg-primary rounded"
                  >
                  LOGIN
                  </button>
                  </Link>
                </div>
              </form>

              <div className="py-3 text-gray-500">
                <p>
                  Do not Have An Account?{" "}
                  <Link to="/register" className="text-primary">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
