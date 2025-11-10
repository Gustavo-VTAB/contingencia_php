<?php
class BaseModel {
    protected $conn;
    protected $table;
    protected $db;

    public function __construct($db) {
        $this->db = $db;
        $this->conn = $db->getConnection();
    }

    public function findAll($includeDeleted = false) {
        $whereClause = $includeDeleted ? "" : "WHERE deleted = FALSE";
        $query = "SELECT * FROM " . $this->table . " " . $whereClause . " ORDER BY id DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }

    public function findById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id AND deleted = FALSE LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetch();
    }

    public function create($data) {
        $fields = array_keys($data);
        $values = array_values($data);
        
        $data['created_by'] = $this->db->getCurrentUser();
        $data['created_at'] = date('Y-m-d H:i:s');
        
        $fields = array_keys($data);
        $placeholders = array_map(function($field) { return ':' . $field; }, $fields);
        
        $query = "INSERT INTO " . $this->table . " (" . implode(', ', $fields) . ") 
                  VALUES (" . implode(', ', $placeholders) . ") RETURNING id";
        
        $stmt = $this->conn->prepare($query);
        
        foreach ($data as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        
        if ($stmt->execute()) {
            $result = $stmt->fetch();
            return $result['id'];
        }
        
        return false;
    }

    public function update($id, $data) {
        $data['updated_by'] = $this->db->getCurrentUser();
        $data['updated_at'] = date('Y-m-d H:i:s');
        
        $setParts = [];
        foreach ($data as $key => $value) {
            $setParts[] = $key . " = :" . $key;
        }
        
        $query = "UPDATE " . $this->table . " SET " . implode(', ', $setParts) . " 
                  WHERE id = :id AND deleted = FALSE";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        
        foreach ($data as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        
        return $stmt->execute();
    }

    public function softDelete($id) {
        $query = "UPDATE " . $this->table . " 
                  SET deleted = TRUE, 
                      deleted_at = :deleted_at, 
                      deleted_by = :deleted_by 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindValue(':deleted_at', date('Y-m-d H:i:s'));
        $stmt->bindValue(':deleted_by', $this->db->getCurrentUser());
        
        return $stmt->execute();
    }

    public function hardDelete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        
        return $stmt->execute();
    }
}
?>