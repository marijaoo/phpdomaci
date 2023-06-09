<?php
include('konekcija.php');

$name = $_POST['name'];
$username = $_POST['username'];
$password = $_POST['password'];

$query = mysqli_query($conn, "SELECT * FROM `login` WHERE username = '$username' AND password = '$password'");

if (mysqli_num_rows($query) == 0) {
    $sql = "INSERT INTO `login` (`punoIme`, `username`, `password`) VALUES ('$name', '$username', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Podaci sačuvani!";
    } else {
        echo "Neuspešno.";
    }
} else {
    echo 'takav login već postoji.';
}



?>