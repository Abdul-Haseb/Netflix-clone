import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSignIn } from "../firebase/AuthService";
import { AuthContext } from "../context/AuthContext";

// Functional component for the Login page
export default function Login() {
  // State to manage form input values
  const [formData, setFormData] = useState({
    email: "", // Email input value
    password: "", // Password input value
  });
  // State to manage "Remember me" checkbox
  const [rememberLogin, setRememberLogin] = useState(false);
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Get Auth context to manage user authentication state
  const authContext = useContext(AuthContext);

  // Check if AuthContext is null
  if (!authContext) {
    console.error("AuthContext is not provided");
    return null; // or handle this case appropriately
  }

  const { setUser, user } = authContext;

  // Handler function for form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Call the UserSignIn function to authenticate the user
      const userCredential = await UserSignIn(
        formData.email, // User's email from formData state
        formData.password // User's password from formData state
      );
      // Check if userCredential is defined before calling setUser
      if (userCredential) {
        setUser(userCredential.user);
      }
      console.log(user); // Log the user object for debugging (optional)
      // Navigate to the home page after successful login
      navigate("/");
      // Clear the form data
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      // Log any errors that occur during the sign-in process
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      {/* Background image for the login page */}
      <img
        className="w-full h-full object-cover absolute z-0"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/1d29f9a4-1900-43dc-a420-99044f734ee2/1b1015e8-1535-4c1e-8113-69f508f3a2d7/PK-en-20240826-POP_SIGNUP_TWO_WEEKS-perspective_WEB_0cde3b39-986f-4ecf-bb90-bda1a934987e_large.jpg"
        alt="" // Alt text for the background image
      />
      {/* Overlay to darken the background image */}
      <div className="bg-black/40 w-full h-full fixed top-0 left-0" />
      {/* Container for the login form */}
      <div className="max-w-screen-md bg-black/80 z-20 relative p-4 md:p-12 lg:p-16 rounded-md">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-n-bold text-left pb-4">
          Login
        </h2>
        <div>
          <form onSubmit={handleSubmit}>
            {/* Email input field */}
            <div className="mt-3 mb-6">
              <input
                type="email" // Input type for email
                required // Makes the field mandatory
                value={formData.email} // Value is controlled by formData state
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email or phone" // Placeholder text
                id=""
                className="border border-gray-700 bg-gray-900 text-gray-200 px-4 py-1.5 md:p-4 rounded-md outline-none w-full md:w-72 lg:w-80"
              />
            </div>
            {/* Password input field */}
            <div className="mt-3 mb-6">
              <input
                type="password" // Input type for password
                value={formData.password} // Value is controlled by formData state
                placeholder="******" // Placeholder text
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                id=""
                className="border border-gray-700 bg-gray-900 text-gray-200 px-4 py-1.5 md:p-4 rounded-md outline-none w-full md:w-72 lg:w-80"
              />
            </div>
            {/* Submit button and OR text */}
            <div>
              <button
                type="submit" // Button type is submit
                className="w-full py-2 rounded-md bg-red-700"
              >
                Login
              </button>
              <p className="w-full text-center py-4">OR</p>
            </div>
            {/* Remember me checkbox and help text */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox" // Input type for checkbox
                  name=""
                  id=""
                  checked={rememberLogin} // Checked state controlled by rememberLogin
                  onChange={() => setRememberLogin(!rememberLogin)}
                />
                <span className="text-gray-500 text-sm">Remember me</span>
              </div>
              <p className="text-gray-500 text-sm">Need help?</p>
            </div>
            {/* Text linking to signup page if already subscribed */}
            <p className="text-gray-500 text-sm py-4">
              Already subscribed to Netflix{" "}
              <span
                className="text-gray-50 cursor-pointer"
                onClick={() => navigate("/Signup")} // Navigates to signup page on click
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
