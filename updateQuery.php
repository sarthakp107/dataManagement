<?php
require_once("settings.php");


//start time measurement
$start_time = microtime(true);

//executing query
$sql = "UPDATE Book
SET title = 'The Great Gatsby - Revised Edition'
WHERE book_id = 3;";
$result = $conn->query($sql);

//end time 
$end_time = microtime(true);

// Calculate execution time in seconds
$execution_time = $end_time - $start_time;
echo "MySQL Query Execution Time: " . $execution_time . " seconds";

$conn->close();
?>