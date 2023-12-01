<?php

require 'koneksi.php';

$id = $_GET['id']; // atau $id = json_decode(file_get_contents("php://input"))->id;

$query = "DELETE FROM inventory WHERE id = $id";
$result = $conn->query($query);

if ($result) {
    echo json_encode(['message' => 'Item deleted successfully']);
} else {
    echo json_encode(['message' => 'Failed to delete item']);
}
?>
