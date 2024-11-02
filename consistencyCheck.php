<?php
require_once("settings.php"); // Ensure this includes the connection setup

// Set isolation level to REPEATABLE READ
$conn->query("SET TRANSACTION ISOLATION LEVEL REPEATABLE READ");

// Start the first transaction
$conn->begin_transaction();

// Initial read
$result = $conn->query("SELECT * FROM Book WHERE author_id = 1");
$rowCountInitial = $result->num_rows;

echo "Initial read, number of books by author_id = 1: $rowCountInitial\n";

// Simulate a delay to allow another transaction to modify the data
sleep(5);

// Read again to check if data has changed
$result2 = $conn->query("SELECT * FROM Book WHERE author_id = 1");
$rowCountAfter = $result2->num_rows;

echo "Second read after delay, number of books by author_id = 1: $rowCountAfter\n";

if ($rowCountInitial === $rowCountAfter) {
    echo "No non-repeatable reads detected.\n";
} else {
    echo "Non-repeatable read detected.\n";
}

// Commit the transaction
$conn->commit();

// Close the connection
$conn->close();
?>
