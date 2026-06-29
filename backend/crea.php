<?php

require('database.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$database = connectDatabase();

$input = json_decode(file_get_contents('php://input'), true);

$room_id = $input['sala_id'];
$name    = $input['prenotante'];
$date    = $input['data'];
$start   = $input['inizio'];
$end     = $input['fine'];

$statement = $database->prepare('INSERT INTO prenotazioni (sala_id, nome_prenotante, data_prenotazione, ora_inizio, ora_fine) VALUES (?, ?, ?, ?, ?)');
$statement->execute([$room_id, $name, $date, $start, $end]);
$new_id = $database->lastInsertId();

header("Content-type: application/json");
echo json_encode([
    'status' => 'ok',
    'id'     => $new_id,
]);
