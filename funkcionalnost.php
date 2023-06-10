<?php
include('konekcija.php');

session_start();

if (isset($_POST['key'])) {

    if ($_POST['key'] == 'ubaci') {

        $login_id = $_SESSION['login_id'];

        $restoran_id = $_POST['restoran_id'];
        $nazivJela = $_POST['nazivJela'];
        $sastojci = $_POST['sastojci'];
        $vremePripreme = $_POST['vremePripreme'];
        $cena = $_POST['cena'];
        $tezina = $_POST['tezina'];

        $check = mysqli_query($conn, "SELECT * FROM restoran WHERE restoran_id = '$restoran_id'");

        if (mysqli_num_rows($check) > 0) {
            echo "Isto jelo sa nazivom  " . $nazivJela . ", već je uneseno!";
        } else {

            $sql = "INSERT INTO `restoran` (`restoran_id`,`nazivJela`, `sastojci`, `vremePripreme`,`cena`, `tezina`,`login_id`) VALUES ('$restoran_id','$nazivJela', '$sastojci', '$vremePripreme', '$cena', '$tezina', '$login_id')";

            if ($conn->query($sql) === TRUE) {
                echo "Ubaceno novo jelo!";
            } else {
                echo "Takvo jelo vec postoji u unosu!";
            }
        }
    }


    if ($_POST['key'] == 'ucitaj') {

        $login_id = $_SESSION['login_id'];

        $start = $conn->real_escape_string($_POST['start']);
        $limit = $conn->real_escape_string($_POST['limit']);
        $sort = $conn->real_escape_string($_POST['sort']);
        $sql = $conn->query("SELECT restoran_id, nazivJela, sastojci, vremePripreme, cena, tezina FROM restoran WHERE login_id = $login_id ORDER BY $sort LIMIT $start, $limit");

        if ($sql->num_rows > 0) {
            $response = "";
            while ($data = $sql->fetch_array()) {

                $response .= '
                                <tr>
                                    <td id="restoran_' . $data["restoran_id"] . '">' . $data["restoran_id"] . '</td>
                                    <td>' . $data["nazivJela"] . '</td>
                                    <td>' . $data["sastojci"] . '</td>
                                    <td>' . $data["vremePripreme"] . '</td>
                                    <td>' . $data["cena"] . '</td>
                                    <td>' . $data["tezina"] . '</td>
                                    <td>
                                        <input type="button" onclick="izmeniIPogledajFunkcija(' . $data["restoran_id"] . ', \'izmeni\')" value="Izmeni jelo" class="btn btn-warning">
                                        <input type="button" onclick="izmeniIPogledajFunkcija(' . $data["restoran_id"] . ', \'vidi\')" value="Pogledaj jelo" class="btn btn-warning">
                                        <input type="button" onclick="izbrisi(' . $data["restoran_id"] . ')" value="Izbriši jelo" class="btn btn-danger">
                                    </td>
                                </tr>
                            ';
            }
            exit($response);
        } else
            exit('reachedMax');
    }


    if ($_POST['key'] == 'izbrisi') {
        $restoran_id = $conn->real_escape_string($_POST['restoran_id']);
        $conn->query("DELETE FROM restoran WHERE restoran_id='$restoran_id'");
        exit('Jelo uspesno obrisano!');
    }

    if ($_POST['key'] == 'uzmiPodatke') {
        $restoran_id = $conn->real_escape_string($_POST['restoran_id']);
        $sql = $conn->query("SELECT restoran_id , nazivJela, sastojci, vremePripreme, cena, tezina FROM restoran WHERE restoran_id = $restoran_id");
        $data = $sql->fetch_array();
        $jsonArray = array(
            'restoran_id' => $data['restoran_id'],
            'nazivJela' => $data['nazivJela'],
            'sastojci' => $data['sastojci'],
            'vremePripreme' => $data['vremePripreme'],
            'cena' => $data['cena'],
            'tezina' => $data['tezina']
        );
        exit(json_encode($jsonArray));
    }

    if ($_POST['key'] == 'izmeni') {

        $trenutni_red = $conn->real_escape_string($_POST['restoran_id']);

        $restoran_id = $_POST['restoran_id'];
        $nazivJela = $_POST['nazivJela'];
        $sastojci = $_POST['sastojci'];
        $vremePripreme = $_POST['vremePripreme'];
        $cena = $_POST['cena'];
        $tezina = $_POST['tezina'];

        $sql = "UPDATE restoran SET nazivJela='$nazivJela', sastojci='$sastojci', vremePripreme='$vremePripreme', cena='$cena', tezina='$tezina' WHERE restoran_id='$trenutni_red'";
        if ($conn->query($sql) === TRUE) {
            echo "Jelo je uspesno izmenjeno u bazi podataka!";
        } else {
            echo "Greska pri izmeni!";
        }

    }
}

mysqli_close($conn);

?>