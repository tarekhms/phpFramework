<?php
//session_unset();
$elements["theme"] = "start";
$elements["title"] = "Home";
$param["redirect"] = "user";
$page_elements["loginpanel"] = (!$_SESSION["logged"] ? $this->construct("loginpanel", $param) : $this->construct("user"));
?>
