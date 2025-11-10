<?php
// Ativar exibição de erros
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Forçar retorno JSON em todas as respostas
header('Content-Type: application/json');

// Definir diretórios base
$baseDir = dirname(__DIR__); // .../src
$appDir = __DIR__;           // .../src/App
$configDir = $baseDir . '/config';
$controllersDir = $appDir . '/controllers';

// Incluir arquivos principais
require_once $configDir . '/cors.php';
require_once $configDir . '/Database.php';
require_once $controllersDir . '/AuthController.php';

// Iniciar sessão (para login)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Criar conexão com o banco
$database = new Database();

// Obter método e URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = strtok($_SERVER['REQUEST_URI'], '?');

// Ajustar caminho da URI
$uri = str_replace(['/api/', '/App/'], '', $uri); // remove /api/ e /App/ para funcionar com React
$uri = trim($uri, '/');
$uriParts = explode('/', $uri);

// Roteamento
try {
    // Rotas de autenticação
    if (!empty($uriParts[0]) && $uriParts[0] === 'auth') {
        $authController = new AuthController($database);

        switch ($uriParts[1] ?? '') {
            case 'login':
                if ($method === 'POST') {
                    $authController->login();
                } else {
                    http_response_code(405);
                    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
                }
                break;

            case 'register':
                if ($method === 'POST') {
                    $authController->register();
                } else {
                    http_response_code(405);
                    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
                }
                break;

            case 'logout':
                if ($method === 'POST') {
                    $authController->logout();
                } else {
                    http_response_code(405);
                    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
                }
                break;

            case 'me':
                if ($method === 'GET') {
                    $authController->me();
                } else {
                    http_response_code(405);
                    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
                }
                break;

            default:
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Rota não encontrada']);
        }
        exit;
    }

    // Qualquer outra rota fora /auth retorna erro
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Recurso não encontrado']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro interno do servidor',
        'error' => $e->getMessage(),
    ]);
}
?>
