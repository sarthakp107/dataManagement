<?php
require_once("settings.php");

// Start time measurement
$start_time = microtime(true);

// Set isolation level
$conn->query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

// Begin transaction
$conn->begin_transaction();

try {
    // Simulate inserting a new loan
    $sql = "INSERT INTO Loan (book_id, member_id, loan_date, due_date, return_date, extension_count)
            VALUES (1, 4, NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY), NULL, 0)";
    $conn->query($sql);

    // Commit transaction
    $conn->commit();
    echo "New loan record inserted successfully.\n";
} catch (Exception $e) {
    $conn->rollback();
    echo "Error inserting data: " . $e->getMessage();
}

// End time measurement
$end_time = microtime(true);
$execution_time = $end_time - $start_time;
echo "MySQL Write Query Execution Time: " . $execution_time . " seconds";

$conn->close();
?>
