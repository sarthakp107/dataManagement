<?php
require_once("settings.php");


//start time measurement
$start_time = microtime(true);

//executing query
$sql = "SELECT Book.title
FROM Book
WHERE book_id IN (SELECT book_id FROM Loan WHERE return_date IS NULL);";
$result = $conn->query($sql);

//end time 
$end_time = microtime(true);

// Calculate execution time in seconds
$execution_time = $end_time - $start_time;
echo "MySQL Query Execution Time: " . $execution_time . " seconds";

$conn->close();
?>