<?php

require('database.php');

header('Access-Control-Allow-Origin: *');

$database = connectDatabase();
$results  = $database->query('SELECT * FROM sale ORDER BY id ASC');
$rooms    = $results->fetchAll(PDO::FETCH_ASSOC);

header("Content-type: application/json; charset=utf-8");
echo json_encode($rooms);
