<?php
class Log {
    private $conn;
    private $table = 'logs';

    public function __construct($db) {
        $this->conn = $db->getConnection();
    }

    public function findAll($filters = []) {
        $whereClauses = [];
        $params = [];

        if (!empty($filters['usuario'])) {
            $whereClauses[] = "usuario ILIKE :usuario";
            $params[':usuario'] = '%' . $filters['usuario'] . '%';
        }

        if (!empty($filters['tabela_afetada'])) {
            $whereClauses[] = "tabela_afetada = :tabela_afetada";
            $params[':tabela_afetada'] = $filters['tabela_afetada'];
        }

        if (!empty($filters['operacao'])) {
            $whereClauses[] = "operacao = :operacao";
            $params[':operacao'] = $filters['operacao'];
        }

        if (!empty($filters['data_inicio'])) {
            $whereClauses[] = "data_operacao >= :data_inicio";
            $params[':data_inicio'] = $filters['data_inicio'];
        }

        if (!empty($filters['data_fim'])) {
            $whereClauses[] = "data_operacao <= :data_fim";
            $params[':data_fim'] = $filters['data_fim'] . ' 23:59:59';
        }

        $whereClause = !empty($whereClauses) ? 'WHERE ' . implode(' AND ', $whereClauses) : '';

        $query = "SELECT * FROM " . $this->table . " " . $whereClause . " ORDER BY data_operacao DESC LIMIT 1000";

        $stmt = $this->conn->prepare($query);

        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }

        $stmt->execute();

        return $stmt->fetchAll();
    }

    public function getStats() {
        $query = "SELECT 
                    COUNT(*) as total,
                    COUNT(CASE WHEN operacao = 'INSERT' THEN 1 END) as inserts,
                    COUNT(CASE WHEN operacao = 'UPDATE' THEN 1 END) as updates,
                    COUNT(CASE WHEN operacao = 'DELETE' THEN 1 END) as deletes,
                    COUNT(DISTINCT usuario) as usuarios_unicos,
                    COUNT(DISTINCT tabela_afetada) as tabelas_afetadas
                  FROM " . $this->table;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetch();
    }
}
?>