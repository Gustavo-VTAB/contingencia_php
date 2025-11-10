import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Search, Filter, Download, Activity, Database, Users, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Log {
  id: number;
  usuario: string;
  tabela_afetada: string;
  operacao: string;
  registro_id: number;
  data_operacao: string;
  detalhes: string;
}

interface LogStats {
  total: number;
  inserts: number;
  updates: number;
  deletes: number;
  usuarios_unicos: number;
  tabelas_afetadas: number;
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [stats, setStats] = useState<LogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    usuario: '',
    tabela_afetada: '',
    operacao: '',
    data_inicio: '',
    data_fim: '',
  });

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await api.getLogs(filters);
      setLogs(data);
    } catch (error) {
      toast.error('Erro ao carregar logs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await api.getLogStats();
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, []);

  const handleFilter = () => {
    fetchLogs();
  };

  const handleClearFilters = () => {
    setFilters({
      usuario: '',
      tabela_afetada: '',
      operacao: '',
      data_inicio: '',
      data_fim: '',
    });
  };

  const getOperationColor = (operacao: string) => {
    switch (operacao) {
      case 'INSERT':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DELETE':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const exportLogs = () => {
    const csv = [
      ['ID', 'Usuário', 'Tabela', 'Operação', 'Registro ID', 'Data', 'Detalhes'].join(','),
      ...logs.map(log => [
        log.id,
        log.usuario,
        log.tabela_afetada,
        log.operacao,
        log.registro_id,
        log.data_operacao,
        `"${log.detalhes.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs_${new Date().toISOString()}.csv`;
    a.click();
    toast.success('Logs exportados com sucesso');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Activity className="h-6 w-6 mr-2 text-blue-600" />
              Logs do Sistema
            </h1>
            <p className="text-gray-600">Auditoria completa de todas as operações</p>
          </div>
          <button
            onClick={exportLogs}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </button>
        </div>

        {/* Estatísticas */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-600">Inserções</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">{stats.inserts}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-600">Atualizações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">{stats.updates}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-red-600">Exclusões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-700">{stats.deletes}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-600 flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  Usuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700">{stats.usuarios_unicos}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-orange-600 flex items-center">
                  <Database className="h-3 w-3 mr-1" />
                  Tabelas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-700">{stats.tabelas_afetadas}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-3">
            <Filter className="h-4 w-4 mr-2 text-gray-600" />
            <h3 className="font-medium text-gray-900">Filtros</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
              <input
                type="text"
                value={filters.usuario}
                onChange={(e) => setFilters({ ...filters, usuario: e.target.value })}
                placeholder="Buscar usuário..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tabela</label>
              <select
                value={filters.tabela_afetada}
                onChange={(e) => setFilters({ ...filters, tabela_afetada: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Todas</option>
                <option value="fb_profiles">Perfis</option>
                <option value="managers">Gestores</option>
                <option value="cards">Cartões</option>
                <option value="phones">Telefones</option>
                <option value="fb_accounts">Contas</option>
                <option value="proxies">Proxies</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Operação</label>
              <select
                value={filters.operacao}
                onChange={(e) => setFilters({ ...filters, operacao: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Todas</option>
                <option value="INSERT">Inserção</option>
                <option value="UPDATE">Atualização</option>
                <option value="DELETE">Exclusão</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
              <input
                type="date"
                value={filters.data_inicio}
                onChange={(e) => setFilters({ ...filters, data_inicio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
              <input
                type="date"
                value={filters.data_fim}
                onChange={(e) => setFilters({ ...filters, data_fim: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleFilter}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Search className="h-4 w-4 mr-2" />
              Filtrar
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Logs */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando logs...</p>
            </div>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum log encontrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <Card key={log.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getOperationColor(log.operacao)}`}>
                          {log.operacao}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{log.tabela_afetada}</span>
                        <span className="text-sm text-gray-500">ID: {log.registro_id}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {log.usuario}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(log.data_operacao).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      {log.detalhes && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-700">
                            Ver detalhes
                          </summary>
                          <pre className="mt-2 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
                            {JSON.stringify(JSON.parse(log.detalhes), null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}