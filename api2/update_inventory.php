<?php
require 'koneksi.php';

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$name = $data->name;
$description = $data->description;
$quantity = $data->quantity;
$category = $data->category;

$query = "UPDATE inventory SET name = '$name', description = '$description', quantity = '$quantity', category = '$category' WHERE id = $id";
$result = $conn->query($query);

if ($result) {
    echo json_encode(['message' => 'Item updated successfully']);
} else {
    echo json_encode(['message' => 'Failed to update item']);
}
?>
