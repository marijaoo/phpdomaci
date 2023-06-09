<?php
include('konekcija.php');

$username = $_POST['username'];
$password = $_POST['password'];

$query = mysqli_query($conn, "SELECT * FROM `login` WHERE username = '$username' AND password = '$password'");

if (mysqli_num_rows($query) == 0) {
    echo "ERROR";
} else {
    session_start();
    $login = mysqli_fetch_assoc($query);
    $_SESSION['login_id'] = $login['login_id'];
    echo "OK";
}

mysqli_close($conn);

?>