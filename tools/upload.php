<?php
ini_set('memory_limit', '450M');

$name  = str_replace(' ', '-', $_FILES['image']['name']);
$name  = preg_replace("/[^A-Za-z0-9\-\_\.]/", "", $name);
$name  = iconv('UTF-8', 'ISO-8859-1//TRANSLIT//IGNORE', $name);
$image = getimagesize($_FILES['image']['tmp_name']);

$original  = "uploads/$sourse/original/";
$thumb     = "uploads/$sourse/thumb/";

$temp      = explode(".", $name);
$extension = end($temp);
$caption   = $temp[0];
$i 		   = 0;
while(@getimagesize($original.$name)){$i++;$name = $caption . "-" . $i . "." . $extension;}

$pattern = "#^(image/)[^\s\n<]+$#i";
$allowedType = array("image/jpeg", "image/jpg", "image/png", "image/gif");
$allowedExts = array("jpeg", "jpg", "png", "gif");

if (preg_match($pattern, $image['mime'])
&& in_array($_FILES["image"]["type"], $allowedType)
&& in_array($extension, $allowedExts)
&& ($_FILES["file"]["size"] < 5000000)
&& $_FILES["file"]["error"] == 0)
{
	$width_size  = ($image[0]/$cwidth);
	$height_size = ($image[1]/$cheight);
	$size = ($width_size<=$height_size?$width_size:$height_size);

	require("tools/resize.php");
	$myimage = new ImageSnapshot;
	$myimage->ImageField = $_FILES['image'];
	$myimage->Width  = ($image[0]/$size);
	$myimage->Height = ($image[1]/$size);
	$myimage->Resize =  true; //if false, snapshot takes a portion from the unsized image.
	$myimage->ResizeScale = "100";
	$myimage->Position = "center";
	$myimage->Compression = 100;
	$myimage->SaveImageAs($thumb.$name);

	$myimage = new ImageSnapshot;
	$myimage->ImageField = $_FILES['image'];
	$myimage->Width  = ($image[0]);
	$myimage->Height = ($image[1]);
	$myimage->Resize =  true; //if false, snapshot takes a portion from the unsized image.
	$myimage->ResizeScale = "100";
	$myimage->Position = "center";
	$myimage->Compression = 100;
	$myimage->SaveImageAs($original.$name);
}
?>
