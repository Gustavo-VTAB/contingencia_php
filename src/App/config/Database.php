<?php
class Database {
    private $host = "localhost";
    private $port = "5432";
    private $db_name = "contingencia";
    private $username = "postgres"; // altere se seu usuário for diferente
    private $password = "admin"; // coloque sua senha do PostgreSQL
    public $conn;

    public function __construct() {
        $this->connect();
    }

    public function connect() {
        try {
            $this->conn = new PDO(
                "pgsql:host=$this->host;port=$this->port;dbname=$this->db_name",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Erro de conexão: " . $e->getMessage()]);
            exit;
        }
    }

    public function getConnection() {
        return $this->conn;
    }
}
?>
