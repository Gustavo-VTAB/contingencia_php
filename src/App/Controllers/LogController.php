<?php
require_once(__DIR__ . '/../models/Log.php');

class LogController {
    private $logModel;

    public function __construct($db) {
        $this->logModel = new Log($db);
    }

    public function index() {
        $filters = [
            'usuario' => $_GET['usuario'] ?? '',
            'tabela_afetada' => $_GET['tabela_afetada'] ?? '',
            'operacao' => $_GET['operacao'] ?? '',
            'data_inicio' => $_GET['data_inicio'] ?? '',
            'data_fim' => $_GET['data_fim'] ?? ''
        ];

        $logs = $this->logModel->findAll($filters);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $logs
        ]);
    }

    public function stats() {
        $stats = $this->logModel->getStats();
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $stats
        ]);
    }
}
?>