<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../../db/Conexao.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (!$name || !$email || !$password) {
    echo json_encode([
        'error' => true,
        'message' => 'Nome, e-mail e senha são obrigatórios.'
    ]);
    exit;
}

try {
    $check = $pdo->prepare("SELECT id FROM users WHERE email = :email");
    $check->bindParam(':email', $email);
    $check->execute();

    if ($check->rowCount() > 0) {
        echo json_encode([
            'error' => true,
            'message' => 'E-mail já cadastrado.'
        ]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $insert = $pdo->prepare("
        INSERT INTO users (name, email, password, login_attempts, blocked, created_at)
        VALUES (:name, :email, :password, 0, false, NOW())
        RETURNING id, name, email
    ");
    $insert->bindParam(':name', $name);
    $insert->bindParam(':email', $email);
    $insert->bindParam(':password', $hashedPassword);
    $insert->execute();

    $user = $insert->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'error' => false,
        'message' => 'Usuário cadastrado com sucesso.',
        'user' => $user
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Erro ao cadastrar usuário: ' . $e->getMessage()
    ]);
}
