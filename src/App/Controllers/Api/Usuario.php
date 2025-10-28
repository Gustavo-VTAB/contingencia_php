<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../../db/Conexao.php';

try {
    $stmt = $pdo->query("SELECT id, name, email FROM users ORDER BY id");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($usuarios);
} catch (PDOException $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Erro ao buscar usuários: ' . $e->getMessage()
    ]);
}
