<?php
//error_reporting(0);
error_reporting( E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_ERROR | E_WARNING | E_PARSE | E_USER_ERROR | E_USER_WARNING | E_RECOVERABLE_ERROR );
session_set_cookie_params(0);
session_cache_limiter(false);

$offline_delay = 2;
$host = $_SERVER['HTTP_HOST'];
preg_match("/[^\.\/]+\.[^\.\/]+$/", $host, $matches);
$host = ($matches[0]&&$matches[0]<>"0.1"?$matches[0]:$host);
define( 'SERVER_NAME', $host );
define( 'PARAMS', explode("/", strtok($_SERVER['REQUEST_URI'], '?')));
define( 'ERROR', FALSE);

$base = PARAMS[1+$offline_delay];
$base = ($base == "" ? "home" : $base);
$view = (isset($_GET['view_as']) ? $_GET['view_as'] : 'default');

function __autoload($class_name){include_once 'class/' . $class_name . '.php';}

$db = new db($conn);
?>
