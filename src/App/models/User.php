<?php
require_once 'BaseModel.php';

class User extends BaseModel {
    protected $table = 'users';

    public function validateLogin($email, $password) {
        $query = "CALL sp_ValidaLogin(:email, :password)";
        
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);
            $stmt->execute();
            
            // Buscar usuário após validação
            $query = "SELECT id, name, email, is_admin, status, blocked 
                      FROM users 
                      WHERE email = :email AND deleted = FALSE";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            
            $user = $stmt->fetch();
            
            if ($user && !$user['blocked'] && $user['status'] === 'active') {
                // Atualizar último login
                $updateQuery = "UPDATE users SET last_login = NOW() WHERE id = :id";
                $updateStmt = $this->conn->prepare($updateQuery);
                $updateStmt->bindParam(':id', $user['id']);
                $updateStmt->execute();
                
                return $user;
            }
            
            return false;
        } catch (PDOException $e) {
            error_log("Login error: " . $e->getMessage());
            return false;
        }
    }

    public function changePassword($email, $oldPassword, $newPassword) {
        $query = "CALL sp_TrocarSenha(:email, :old_password, :new_password)";
        
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':old_password', $oldPassword);
            $stmt->bindParam(':new_password', $newPassword);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Change password error: " . $e->getMessage());
            return false;
        }
    }

    public function unlockUser($email) {
        $query = "CALL sp_DesbloquearUsuario(:email)";
        
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Unlock user error: " . $e->getMessage());
            return false;
        }
    }

    public function findByEmail($email) {
        $query = "SELECT * FROM users WHERE email = :email AND deleted = FALSE LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        return $stmt->fetch();
    }

    public function register($data) {
        // Hash da senha antes de salvar
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        $data['status'] = 'active';
        $data['is_admin'] = false;
        $data['login_attempts'] = 0;
        $data['blocked'] = false;
        
        return $this->create($data);
    }
}
?>