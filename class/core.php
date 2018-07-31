<?php
class core{
  private $ele = array();
  public function __construct($page, $view, $db, $theme, $params){
    $this->ele["content"] = $this->construct($page, null, $view, $db, $params);
    if($view=="default"){
      if(isset($this->ele["theme"]) && file_exists("themes/".$this->ele["theme"]."/base.html")){$structure = file_get_contents("themes/".$this->ele["theme"]."/base.html");}
      elseif(file_exists("themes/".$theme."/base.html")){$structure = file_get_contents("themes/".$theme."/base.html");}
      else{$structure = "Theme is not specified..";}
      foreach($this->ele as $k=>$v){$structure = str_replace("[$k]", $v, $structure);}
      echo $structure;
    }else{echo json_encode($this->ele);}
    return true;
  }
  public function construct($page, $param=array(), $view=null, $db=null, $params=null, $page_elements=array()){
    if(!file_exists("process/".$page.".php") || !file_exists("html/".$page.".html")){$page = "404";}
    require("process/".$page.".php");
    $this->ele = $elements;
    $structure = file_get_contents("html/".$page.".html");
    foreach($page_elements as $k=>$v){$structure = str_replace("[$k]", $v, $structure);}
    return $structure;
  }
}
?>
