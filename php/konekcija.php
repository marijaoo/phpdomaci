<?php

$conn = new mysqli('localhost', 'root', '');

if (!mysqli_select_db($conn, 'phpdomaci')) {
    echo "Baza podataka ne postoji!";
}


?>