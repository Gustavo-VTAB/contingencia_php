<?php
$host = '127.0.0.5';
$dbname = 'contingencia_php';
$user = 'postgres';
$password = 'admin';
$port = '5432'; 

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname;port=$port", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
}
?>
