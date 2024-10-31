<?php
require_once("settings.php");


//start time measurement
$start_time = microtime(true);

//executing query-- Find all loans with member and book details for loans issued in 2023

$sql = "SELECT Loan.loan_id, Member.first_name, Member.last_name, Book.title, Loan.loan_date 
FROM Loan 
JOIN Member ON Loan.member_id = Member.member_id 
JOIN Book ON Loan.book_id = Book.book_id 
WHERE YEAR(Loan.loan_date) = 2023; ";
$result = $conn->query($sql);

//end time 
$end_time = microtime(true);

// Calculate execution time in seconds
$execution_time = $end_time - $start_time;
echo "MySQL Query Execution Time: " . $execution_time . " seconds";

$conn->close();
?>