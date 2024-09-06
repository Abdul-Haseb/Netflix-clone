import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSignUp } from "../firebase/AuthService";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";

// Functional component for the Signup page
export default function Signup() {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "", // User's name input value
    email: "", // User's email input value
    password: "", // User's password input value
  });

  // State to manage "Remember me" checkbox
  const [rememberLogin, setRememberLogin] = useState(false);

  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  // Get Auth context to manage user authentication state
  const { user, setUser } = authContext;

  console.log(formData.name);
  // Handler function for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Call the UserSignUp function to create a new user
      const userCredential = await UserSignUp(
        formData.email, // User's email from formData state
        formData.password // User's password from formData state
      );

      // Check if userCredential is defined before calling setUser
      if (userCredential) {
        await updateProfile(userCredential.user, {
          displayName: formData.name,
        });
        setUser(userCredential.user); // Set the user in context
      }

      console.log(user);
    } catch (error) {
      // Log any errors that occur during the sign-up process
      console.log(error);
    }

    // Clear the form data after successful sign-up
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    // Navigate to the home page after successful sign-up
    navigate("/");
  };

  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      {/* Background image for the signup page */}
      <img
        className="w-full h-full object-cover absolute z-0"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/1d29f9a4-1900-43dc-a420-99044f734ee2/1b1015e8-1535-4c1e-8113-69f508f3a2d7/PK-en-20240826-POP_SIGNUP_TWO_WEEKS-perspective_WEB_0cde3b39-986f-4ecf-bb90-bda1a934987e_large.jpg"
        alt="" // Alt text for the background image
      />
      {/* Overlay to darken the background image */}
      <div className="bg-black/40 w-full h-full fixed top-0 left-0" />
      {/* Container for the signup form */}
      <div className="max-w-screen-md bg-black/80 z-20 relative p-4 md:p-12 lg:p-16 rounded-md">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-n-bold text-left pb-4">
          Sign Up
        </h2>
        <div>
          <form onSubmit={handleSubmit}>
            {/* Name input field */}
            <div className="mt-3 mb-6">
              <input
                type="text" // Input type for email
                name=""
                required // Makes the field mandatory
                value={formData.name} // Value is controlled by formData state
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name" // Placeholder text
                id=""
                className="border border-gray-700 bg-gray-900 text-gray-200 px-4 py-1.5 md:p-4 rounded-md outline-none w-full md:w-72 lg:w-80"
              />
            </div>
            {/* Email input field */}
            <div className="mt-3 mb-6">
              <input
                type="email" // Input type for email
                name=""
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
                name=""
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
                Sign Up
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
            {/* Text linking to login page if already subscribed */}
            <p className="text-gray-500 text-sm py-4">
              Already subscribed to Netflix{" "}
              <span
                className="text-gray-50 cursor-pointer"
                onClick={() => navigate("/Login")} // Navigates to login page on click
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
