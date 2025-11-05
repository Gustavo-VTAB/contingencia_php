<?php
require_once '../config/database.php';

class ProfileController {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function index() {
        try {
            $sql = "
                SELECT 
                    fp.*,
                    m.name as manager_name,
                    p.number as phone_number,
                    p.operator as phone_operator,
                    (SELECT COUNT(*) FROM fb_pages WHERE id IN (
                        SELECT page_id FROM profile_pages WHERE profile_id = fp.id
                    )) as pages_count,
                    (SELECT COUNT(*) FROM fb_bms WHERE id IN (
                        SELECT bm_id FROM profile_bms WHERE profile_id = fp.id
                    )) as bms_count
                FROM fb_profiles fp
                LEFT JOIN managers m ON fp.manager_id = m.id
                LEFT JOIN phones p ON fp.phone_id = p.id
                ORDER BY fp.name
            ";
            
            $profiles = $this->db->fetchAll($sql);
            
            // Format data for frontend
            $formattedProfiles = array_map(function($profile) {
                return [
                    'id' => (int)$profile['id'],
                    'name' => $profile['name'],
                    'status' => $profile['status'],
                    'obs' => $profile['obs'],
                    'email' => $profile['name'] . '@email.com', // Generated email
                    'recovery_email' => $profile['name'] . '.backup@gmail.com', // Generated recovery
                    'phone_number' => $profile['phone_number'],
                    'proxy' => $profile['obs'] ?? 'Sem proxy',
                    'pages_count' => (int)$profile['pages_count'],
                    'bms_count' => (int)$profile['bms_count'],
                    'manager' => $profile['manager_name'] ? [
                        'id' => (int)$profile['manager_id'],
                        'name' => $profile['manager_name']
                    ] : null,
                    'phone' => $profile['phone_number'] ? [
                        'id' => (int)$profile['phone_id'],
                        'number' => $profile['phone_number'],
                        'operator' => $profile['phone_operator']
                    ] : null
                ];
            }, $profiles);

            echo json_encode($formattedProfiles);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function show($id) {
        try {
            $sql = "
                SELECT 
                    fp.*,
                    m.name as manager_name,
                    p.number as phone_number,
                    p.operator as phone_operator
                FROM fb_profiles fp
                LEFT JOIN managers m ON fp.manager_id = m.id
                LEFT JOIN phones p ON fp.phone_id = p.id
                WHERE fp.id = ?
            ";
            
            $profile = $this->db->fetchOne($sql, [$id]);
            
            if (!$profile) {
                http_response_code(404);
                echo json_encode(['error' => 'Perfil não encontrado']);
                return;
            }

            $formattedProfile = [
                'id' => (int)$profile['id'],
                'name' => $profile['name'],
                'status' => $profile['status'],
                'obs' => $profile['obs'],
                'email' => $profile['name'] . '@email.com',
                'recovery_email' => $profile['name'] . '.backup@gmail.com',
                'phone_number' => $profile['phone_number'],
                'proxy' => $profile['obs'] ?? 'Sem proxy',
                'manager' => $profile['manager_name'] ? [
                    'id' => (int)$profile['manager_id'],
                    'name' => $profile['manager_name']
                ] : null,
                'phone' => $profile['phone_number'] ? [
                    'id' => (int)$profile['phone_id'],
                    'number' => $profile['phone_number'],
                    'operator' => $profile['phone_operator']
                ] : null
            ];

            echo json_encode($formattedProfile);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function store() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['name'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Nome é obrigatório']);
                return;
            }

            $sql = "
                INSERT INTO fb_profiles (name, status, manager_id, phone_id, obs) 
                VALUES (?, ?, ?, ?, ?)
            ";
            
            $params = [
                $input['name'],
                $input['status'] ?? 'active',
                $input['manager_id'] ?? null,
                $input['phone_id'] ?? null,
                $input['obs'] ?? null
            ];

            $this->db->execute($sql, $params);
            $id = $this->db->lastInsertId();

            echo json_encode(['id' => $id, 'message' => 'Perfil criado com sucesso']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function update($id) {
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['name'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Nome é obrigatório']);
                return;
            }

            $sql = "
                UPDATE fb_profiles 
                SET name = ?, status = ?, manager_id = ?, phone_id = ?, obs = ?
                WHERE id = ?
            ";
            
            $params = [
                $input['name'],
                $input['status'] ?? 'active',
                $input['manager_id'] ?? null,
                $input['phone_id'] ?? null,
                $input['obs'] ?? null,
                $id
            ];

            $affected = $this->db->execute($sql, $params);

            if ($affected === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Perfil não encontrado']);
                return;
            }

            echo json_encode(['message' => 'Perfil atualizado com sucesso']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function delete($id) {
        try {
            $sql = "DELETE FROM fb_profiles WHERE id = ?";
            $affected = $this->db->execute($sql, [$id]);

            if ($affected === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Perfil não encontrado']);
                return;
            }

            echo json_encode(['message' => 'Perfil excluído com sucesso']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
?>