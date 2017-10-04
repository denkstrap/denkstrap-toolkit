<?php
$val = $_GET["value"];
if ( $val === '' ) {
    $valBack = 0;
} else {
    $valBack = 1;
}


$json = '{ "isValid": ' . $valBack . ' }';

echo $json;

# echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '_data/data.json' );
?>