<?php
session_start();
include_once('connector.php');
include_once('config.php');
new core($base, $view, $db, PARAMS);
//session_unset();
?>
