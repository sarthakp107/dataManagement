<?php
require_once("settings.php");

// Start time measurement
$start_time = microtime(true);

// Set isolation level to simulate different levels of concurrency
$conn->query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

// Begin transaction
$conn->begin_transaction();

try {
    $sql = "SELECT * FROM Book WHERE branch_id = 1";
    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        echo "Book ID: " . $row['book_id'] . " - Title: " . $row['title'] . "\n";
    }

    // Commit transaction
    $conn->commit();
} catch (Exception $e) {
    $conn->rollback();
    echo "Error reading data: " . $e->getMessage();
}

// End time measurement
$end_time = microtime(true);
$execution_time = $end_time - $start_time;
echo "MySQL Read Query Execution Time: " . $execution_time . " seconds";

$conn->close();
?>
