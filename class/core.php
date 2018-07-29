<?php
class core{
  private $ele = array();
  public function __construct($page, $view, $db, $params){
    $this->ele["content"] = $this->construct($page, null, $view, $db, $params);
    if($view=="default"){
      if(isset($this->ele["theme"])){$structure = file_get_contents("html/".$this->ele["theme"].".html");}
      else{$structure = "Theme is not specified..";}
      foreach($this->ele as $k=>$v){$structure = str_replace("[$k]", $v, $structure);}
      echo $structure;
    }else{echo json_encode($this->ele);}
    return true;
  }
  public function construct($page, $param=array(), $view=null, $db=null, $params=null, $page_elements=array()){
    if(file_exists("process/".$page.".php")){require("process/".$page.".php");}
    else{require("process/404.php"); $page = "404";}
    $this->ele = $elements;
    if(file_exists("html/".$page.".html")){$structure = file_get_contents("html/".$page.".html");}
    else{$structure = "Theme doesn't exist.. please contact webmaster.";}
    foreach($page_elements as $k=>$v){$structure = str_replace("[$k]", $v, $structure);}
    return $structure;
  }
}
?>
