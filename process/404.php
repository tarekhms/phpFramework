<?php
header("HTTP/1.0 404 Not Found");
$elements['param'] = $_SERVER['REQUEST_URI'];
$elements['title'] = "Website! - 404 Page not found!";
$elements['description'] = "404 Page not found!";
$elements['keywords'] = "";
$page_elements['param'] = implode("/",PARAMS);
?>
