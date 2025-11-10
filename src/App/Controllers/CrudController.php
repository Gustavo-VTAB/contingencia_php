<?php
class CrudController {
    private $model;

    public function __construct($model) {
        $this->model = $model;
    }

    public function index() {
        $items = $this->model->findAll();
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $items
        ]);
    }

    public function show($id) {
        $item = $this->model->findById($id);

        if ($item) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $item
            ]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Item não encontrado']);
        }
    }

    public function store() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
            return;
        }

        $id = $this->model->create($data);

        if ($id) {
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Item criado com sucesso',
                'id' => $id
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao criar item']);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
            return;
        }

        $result = $this->model->update($id, $data);

        if ($result) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Item atualizado com sucesso'
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao atualizar item']);
        }
    }

    public function delete($id) {
        $result = $this->model->softDelete($id);

        if ($result) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Item excluído com sucesso'
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Erro ao excluir item']);
        }
    }
}
?>