<?php

$conexion = new PDO("mysql:host=localhost;dbname=multiple_images", "feri", "123");
$setnames = $conexion->prepare("SET NAMES 'utf8mb4'");
$setnames->execute();
