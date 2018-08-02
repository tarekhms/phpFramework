<?php
session_start();
include_once('connector.php');
include_once('config.php');
new core($base, $view, $db, $theme, PARAMS);

//session_unset();
?>
