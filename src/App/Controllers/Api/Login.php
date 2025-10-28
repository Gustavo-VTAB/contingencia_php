<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../../db/Conexao.php'; // seu arquivo de conexão PDO

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$email || !$password) {
    echo json_encode([
        'error' => true,
        'message' => 'Email e senha são obrigatórios.'
    ]);
    exit;
}

try {
    // Executa a procedure
    $stmt = $pdo->prepare("CALL sp_ValidaLogin(:email, :password)");
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    // A procedure usa RAISE NOTICE, mas no PHP não é capturado diretamente.
    // Então vamos buscar o usuário para validar o login
    $stmt = $pdo->prepare("SELECT id, name, email, blocked FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['error' => true, 'message' => 'Usuário não encontrado.']);
    } elseif ($user['blocked']) {
        echo json_encode(['error' => true, 'message' => 'Usuário bloqueado. Contate o administrador.']);
    } elseif ($password !== $user['password']) {
        echo json_encode(['error' => true, 'message' => 'Senha incorreta.'] );
    } else {
        // Login OK
        echo json_encode([
            'error' => false,
            'message' => 'Login realizado com sucesso.',
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Erro ao validar login: ' . $e->getMessage()
    ]);
}
