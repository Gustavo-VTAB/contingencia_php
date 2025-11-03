import { useEffect, useState } from "react";

interface Perfil {
  id: number;
  name: string;
  status: string;
  obs?: string;
  manager_name?: string;
  phone_number?: string;
}

export default function Perfis() {
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/backend/App/Controllers/Api/Perfil.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPerfis(data.data);
      })
      .catch((err) => console.error("Erro ao carregar perfis:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Perfis do Facebook
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {perfis.map((perfil) => (
          <div
            key={perfil.id}
            className="bg-white shadow-md rounded-2xl border border-gray-100 p-4 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">
                {perfil.name}
              </h2>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  perfil.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {perfil.status === "active" ? "Ativo" : "Inativo"}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              <strong>Gestor:</strong>{" "}
              {perfil.manager_name || "Sem gestor"}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Telefone:</strong>{" "}
              {perfil.phone_number || "Sem telefone"}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              {perfil.obs || ""}
            </p>

            <div className="flex justify-between mt-3">
              <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                Visualizar
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-md hover:bg-gray-200">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
