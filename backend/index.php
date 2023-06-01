<?php

error_reporting(1); // turn off errors output
header("Access-Control-Allow-Origin: http://127.0.0.1:5173"); // allow local browser access to backend
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$action = $_GET['action'] ?? null;

if ($action === 'getfavicons') { // Get formatted html with the latest tweets
    $favicons = file_get_contents('storage/favicons.json');
    $selected = file_get_contents('storage/selected_favicon.json');
    die(json_encode([
        'favicons' => json_decode($favicons),
        'selected' => json_decode($selected),
    ]));
}

if ($action === 'selectfavicon') { // Get formatted html with the latest tweets
    $_PUT = json_decode(file_get_contents("php://input"), true);
    if (!isset($_PUT['name'])) die(json_encode(['result' => false]));

    $name = $_PUT['name'];
    file_put_contents('storage/selected_favicon.json', "{\"name\": \"$name\"}");

    die(json_encode(['result' => true]));
}

if ($action === 'deletefavicon') { // Get formatted html with the latest tweets
    $_DELETE = json_decode(file_get_contents("php://input"), true);
    if (!isset($_DELETE['name'])) die(json_encode(['result' => false]));

    unlink('storage/selected_favicon.json');

    die(json_encode(['result' => true]));
}

