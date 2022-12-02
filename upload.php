<?php

require "db.php";
require "generar.php";
$Generar = new Generar();

function getFileExtension(string $filename): string
{
    //$filename = 1.jpg            |   ["1", "jpg"]       | return ".jpg"
    $name = explode(".", $filename);
    return "." . array_pop($name);
}

if (isset($_FILES) && !empty($_FILES)) {
    $fotosASubir = $_POST;
    $files = array_filter($_FILES, function ($item) {
        return $item["name"][0] != "";
    });

    foreach ($files as $InputFile) {
        $length = count($InputFile["name"]);
        for ($i = 0; $i < $length; $i++) {
            $tmp_name = $InputFile["tmp_name"][$i];
            $name = $InputFile["name"][$i];
            $extension = getFileExtension($name);
            $newName = $Generar->GenerarP(10) . $extension;
            $path = "images/$newName";
            if (in_array($name, $fotosASubir)) {
                $insertImages = $conexion->prepare("INSERT INTO images (image) VALUES (:image);");
                $wasUploaded = $insertImages->execute(array(
                    ":image" => $newName,
                ));

                if ($wasUploaded) {
                    move_uploaded_file($tmp_name, $path);
                } else {
                    die("Hubo un error, por favor, contacta al administrador.");
                }
            }
        }
    }
}

header("location: ./");
