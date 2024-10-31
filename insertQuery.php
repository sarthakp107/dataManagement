<?php
require_once("settings.php");


//start time measurement
$start_time = microtime(true);

//executing query
$sql = "INSERT INTO Book (branch_id, author_id, title)
VALUES 
    (1, 1, 'Advanced Data Management'),
    (1, 2, 'Database Systems'),
    (2, 3, 'MongoDB Essentials');";

$result = $conn->query($sql);

//end time 
$end_time = microtime(true);

// Calculate execution time in seconds
$execution_time = $end_time - $start_time;
echo "MySQL Query Execution Time: " . $execution_time . " seconds";

$conn->close();
?>