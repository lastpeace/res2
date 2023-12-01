<?php

require 'koneksi.php';

// Mendapatkan data dari permintaan
$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$description = $data->description;
$quantity = $data->quantity;
$category = $data->category;

$query = "INSERT INTO inventory (name, description, quantity, category) VALUES ('$name', '$description', '$quantity', '$category')";
$result = $conn->query($query);

if ($result) {
    echo json_encode(['message' => 'Item added successfully']);
} else {
    echo json_encode(['message' => 'Failed to add item']);
}
?>
