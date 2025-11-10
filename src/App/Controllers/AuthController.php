<?php
class AuthController {
    private $conn;

    public function __construct($database) {
        $this->conn = $database->getConnection();
    }

    public function register() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['name'], $data['email'], $data['password'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Campos obrigatórios: name, email, password']);
            return;
        }

        $name = htmlspecialchars($data['name']);
        $email = htmlspecialchars($data['email']);
        $password = password_hash($data['password'], PASSWORD_DEFAULT);

        try {
            $stmt = $this->conn->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);
            $stmt->execute();

            http_response_code(201);
            echo json_encode(['success' => true, 'message' => 'Usuário cadastrado com sucesso']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar', 'error' => $e->getMessage()]);
        }
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['email'], $data['password'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Email e senha são obrigatórios']);
            return;
        }

        $email = htmlspecialchars($data['email']);
        $password = $data['password'];

        try {
            $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                http_response_code(200);
                echo json_encode(['success' => true, 'message' => 'Login realizado com sucesso', 'user' => $user]);
            } else {
                http_response_code(401);
                echo json_encode(['success' => false, 'message' => 'Credenciais inválidas']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro no login', 'error' => $e->getMessage()]);
        }
    }

    public function logout() {
        session_destroy();
        echo json_encode(['success' => true, 'message' => 'Logout realizado com sucesso']);
    }

    public function me() {
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Não autenticado']);
            return;
        }

        $id = $_SESSION['user_id'];
        $stmt = $this->conn->prepare("SELECT id, name, email, created_at FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'user' => $user]);
    }
}
?>
