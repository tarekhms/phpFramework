<?php
session_set_cookie_params(0);
session_cache_limiter(false);
session_start();
include_once('connector.php');
include_once('config.php');
new core($base, $view, $db, $theme, PARAMS);

//session_unset();
?>
