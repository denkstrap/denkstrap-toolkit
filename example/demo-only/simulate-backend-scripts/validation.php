<?php

$jsonSend = file_get_contents("php://input");
$jsonDecode = json_decode($jsonSend);


$val = $jsonDecode->{'value'};

if ( $val === '' || $val === 0 ) {
    $valBack = 0;
} else {
    $valBack = 1;
}

$msg = $jsonDecode->{'validatorData'}->{'ajax'}->{'message'};

$msg = str_replace( '{{ name }}', 'Presley', $msg );

$options = '{ "feedbackDisplay": { "fieldShowState": true } }';
$json = '{ "isValid": ' . $valBack . ', "options": ' . $options . ', "message": "' . $msg . '" }';

echo $json;


?>