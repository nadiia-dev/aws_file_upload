import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    localStorage.setItem("userEmail", email);
    navigate("/upload");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md flex flex-col gap-4 border border-blue-200"
      >
        <h2 className="text-2xl font-semibold text-blue-700 text-center">
          Enter your email
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          required
          className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Register;
