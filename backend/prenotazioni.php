<?php

require('database.php');

header('Access-Control-Allow-Origin: *');

$database = connectDatabase();
$results  = $database->query('SELECT prenotazioni.*, sale.nome AS sala_nome FROM prenotazioni JOIN sale ON prenotazioni.sala_id = sale.id ORDER BY prenotazioni.data_prenotazione ASC, prenotazioni.ora_inizio ASC');
$rows     = $results->fetchAll(PDO::FETCH_ASSOC);

$reservations = [];

foreach ($rows as $row) {
    $reservations[] = [
        'id'         => $row['id'],
        'sala_id'    => $row['sala_id'],
        'sala_nome'  => $row['sala_nome'],
        'prenotante' => $row['nome_prenotante'],
        'data'       => $row['data_prenotazione'],
        'inizio'     => $row['ora_inizio'],
        'fine'       => $row['ora_fine'],
    ];
}

header("Content-type: application/json; charset=utf-8");
echo json_encode($reservations);
