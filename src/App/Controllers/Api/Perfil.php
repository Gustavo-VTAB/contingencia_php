<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require_once __DIR__ . '/../../db/Conexao.php';

try {
    $stmt = $pdo->query("
        SELECT 
            p.id, 
            p.name, 
            p.status, 
            p.obs,
            m.name AS manager_name,
            ph.number AS phone_number
        FROM fb_profiles p
        LEFT JOIN managers m ON p.manager_id = m.id
        LEFT JOIN phones ph ON p.phone_id = ph.id
        ORDER BY p.id DESC
    ");
    
    $profiles = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $profiles]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
