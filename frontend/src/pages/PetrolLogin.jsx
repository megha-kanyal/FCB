import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PetrolLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/petrol/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("petrolToken", data.token);
        alert(" Login successful!");
        navigate("/petrol/dashboard");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow rounded-lg w-full max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Petrol Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full rounded mb-2"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 w-full rounded mb-4"
        onChange={handleChange}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </form>
  );
}