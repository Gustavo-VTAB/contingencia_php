import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import type { Usuario } from "../types";

export default function Cadastro() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuarios((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (usuarios[0].password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost/api/cadastro.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarios),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.message);
      } else {
        console.log("Usuário cadastrado:", result.user);
        // redirecionar ou limpar formulário
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Contingência</h1>
      </div>

      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-lg w-11/12 max-w-md"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Cadastrar</h2>

          {error && (
            <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
          )}

          <div className="mb-6 relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={usuarios[0].name}
              onChange={handleChange}
              placeholder="Nome"
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
              required
            />
          </div>

          <div className="mb-6 relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={usuarios[0].email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
              required
            />
          </div>

          <div className="mb-6 relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={usuarios[0].password}
              onChange={handleChange}
              placeholder="Senha"
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
              required
            />
          </div>

          <div className="mb-6 relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a Senha"
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex justify-center items-center"
          >
            {loading ? "Carregando..." : "Cadastrar"}
          </button>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Já tem cadastro? <a href="#" className="text-blue-600">Entrar</a>
          </p>
        </form>
      </div>
    </div>
  );
}
