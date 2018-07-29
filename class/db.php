<?php
class db
{
  private $conn;
  public function __construct($conn){
      $this->conn = $conn;
	}

  public function query($query){
		return $this->conn->query($query);
	}
  public function create($table, $data=array(), $decoded=true, $columns="`id`", $values="NULL"){
    foreach ($data as $key => $value) {
      $columns .= ", `$key`";
      $values .= ($decoded ? ", '" . urlencode($this->conn->real_escape_string($value)) . "'" : ", '" . $this->conn->real_escape_string($value) . "'");
    }
    if(!$this->conn->query("INSERT INTO `$table` ($columns) values ($values)")){return $this->conn->error;}
    else{return true;}
  }
  public function select($table, $where=NULL, $order=NULL, $limit=NULL){
		return $this->conn->query("select * from $table $where $order $limit");
	}
	public function num($query){
		return $query->num_rows;
	}
	public function fetch($result){
		return $result->fetch_assoc();
	}
  public function result($field, $table, $where=NULL){
    $result = $this->conn->query("select $field from $table $where");
    $data =  ($this->num($result) > 0 ? $result->fetch_array(MYSQLI_NUM) : false);
    return urldecode($data[0]);
	}
  public function result2($query){
    $result = $this->conn->query($query);
    $data =  ($this->num($result) > 0 ? $result->fetch_array(MYSQLI_NUM) : false);
    return urldecode($data[0]);
	}
  public function update($section, $field, $data, $id){
		return $this->query("update `$section` set `$field`='". $this->conn->real_escape_string($data)."' where id='$id'");
	}
  public function real_escape_string($string){
    return $this->conn->real_escape_string($string);
	}
  public function last_id(){
    return $this->conn->insert_id;
	}
}
?>
