import { useState } from "react";
import { Mail, Lock } from "lucide-react"; 

interface Usuario {
  email: string;
  password: string;
}

export default function Login() {
  const [usuario, setUsuario] = useState<Usuario>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const result = await response.json();

    if (result.error) {
      setError(result.message);
    } else {
      console.log("Usuário logado:", result.user);
      // redirecionar ou salvar sessão
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
          <h2 className="text-3xl font-bold mb-8 text-center">Entrar</h2>

          {error && (
            <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
          )}

          <div className="mb-6 relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={usuario.email}
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
              value={usuario.password}
              onChange={handleChange}
              placeholder="Senha"
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex justify-center items-center"
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Esqueceu a senha? <a href="#" className="text-blue-600">Recuperar</a>
          </p>
        </form>
      </div>
    </div>
  );
}
