<?php

error_reporting(1); // turn off errors output
header("Access-Control-Allow-Origin: http://127.0.0.1:5173"); // allow local browser access to backend
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$action = $_GET['action'] ?? null;

if ($action === 'getfavicons') { // Get formatted html with the latest tweets
    die(file_get_contents('storage/favicons.json'));
}