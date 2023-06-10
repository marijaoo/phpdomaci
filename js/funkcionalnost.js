$(document).ready(function(){

    $("#dodajNovu").on('click', function () {
        $("#upravljanjeTabelom").modal('show');
    });

    //dogadjaj pripremanja forme za prikaz modala
    $("#upravljanjeTabelom").on('hidden.bs.modal', function () {

        $("#izmeni").fadeIn();
        $("#vidi").fadeOut();
        $("#restoran_id").val("");
        $("#nazivJela").val("");
        $("#sastojci").val("");
        $("#vremePripreme").val("");
        $("#cena").val("");
        $("#tezina").val("");

        $("#izmeniRestoranID").val(0);

        $("#closeBtn").fadeOut();
        
        $(".modal-title").html("Unos novog jela na stavci menija:");
        document.getElementById("restoran_id").disabled = false;
        $("#manageBtn").attr('value', 'Dodaj').attr('onclick', "univerzalnaFunkcija('ubaci')").fadeIn();
        $("div").css("color", "black");
    });    

    povuciPodatkeSaBaze(0, 100);
});

//Ucitavanje podataka iz baze podataka koji ce se prikazivati u glavnoj tabeli
function povuciPodatkeSaBaze(start, limit) {

    //parametar prema kome je odabrano sortiranje
    var sort = $("#izbor").val();

    $.ajax({
        
        url: 'funkcionalnost.php',
        method: 'POST',
        dataType: 'text',

        data: {
            key: 'ucitaj',
            sort: sort,
            start: start,
            limit: limit
        }, success: function (response) {

            if (response != "reachedMax") {

                $('tbody').append(response);
                start += limit;
                povuciPodatkeSaBaze(start, limit);

            }
        }
    });
}

//Funkcionalnost za izmenu ili detaljnije gledanje menija. Objedinjeno jer koriste isti modal.
function izmeniIPogledajFunkcija(broj_reda, tip){

    
    $.ajax({

            url: 'funkcionalnost.php',
            method: 'POST',
            dataType: 'json',

            data: {
                key: 'uzmiPodatke',
                restoran_id: broj_reda
            },
            success: function(response){

                if(tip == "vidi"){

                    $(".modal-title").html("Detaljne informacije");
                    $("#vidi").fadeIn();
                    $("#izmeni").fadeOut();

                    $("#nazivJela2").html(response.nazivJela);
                    $("#cenaJela").html(response.cena);
                    $("#tezinaJela").html(response.tezina);

                    $("#manageBtn").fadeOut();
                    $("#closeBtn").fadeIn();
                    $("div").css("color", "black");

                } else {

                    $("#izmeni").fadeIn();
                    $("#vidi").fadeOut();
                    $("#izmeniRestoranID").val(broj_reda);
                    $("#restoran_id").val(response.restoran_id);
                    $("#nazivJela").val(response.nazivJela);
                    $("#sastojci").val(response.sastojci);
                    $("#vremePripreme").val(response.vremePripreme);
                    $("#cena").val(response.cena);
                    $("#tezina").val(response.tezina);
                    $("#manageBtn").attr('value','Sačuvaj sve izmene').attr('onclick', "univerzalnaFunkcija('izmeni')");
                    $("#closeBtn").fadeIn();
                    $(".modal-title").html("Izmenite jelo " + " " + response.nazivJela);
                    document.getElementById("restoran_id").disabled = true;

                }

                $("#upravljanjeTabelom").modal('show');

        }     
    });
        
}

//Funkcija brisanja unosa stavke menija
function izbrisi(red){
    if(confirm('Da li ste sigurni da biste obrisali?' + red)){
        $.ajax({
            url: 'funkcionalnost.php',
            method: 'POST',
            dataType: 'text',
            data: {
                key: 'izbrisi',
                restoran_id: red
            }, success: function (response) {
                $("#restoran_"+red).parent().remove();
                alert(response);
                location.reload();
            }
        });
    }
}

function univerzalnaFunkcija(operacija){

    var restoran = $("#restoran_id");
    var n = $("#nazivJela");
    var s = $("#sastojci");
    var vp = $("#vremePripreme");
    var c = $("#cena");
    var t = $("#tezina");
    
        
    if (isNotEmpty(n) & isNotEmpty(s) & isNotEmpty(vp) & isNotEmpty(c) & isNotEmpty(t)){
        $.ajax({
            url: 'funkcionalnost.php',
            method: 'POST',
            dataType: 'text',
            data: {
                key: operacija,
                restoran_id: restoran.val(),
                nazivJela: n.val(),
                sastojci: s.val(),
                vremePripreme: vp.val(),
                cena: c.val(),
                tezina: t.val(),
            },
            success: function(data){
                    if(data!='Ubacena nova stavka menija!' || data!='Uspešno izmenjena stavka menija!'){
                        alert(data);
                    } else {
                        alert(data);
                    }
                    
                    location.reload();
                }
        })
    }
}

// POMOCNE FUNKCIJE:

//Bojenje bordera forme ukoliko podaci nisu uneseni
function isNotEmpty(poziv){
    if (poziv.val() == ''){
        poziv.css('border', '1px solid red');
        return false;
    } else 
        poziv.css('border','');
    return true;
}

//Vracanje unesenih podataka na prazno
function resetuj(){
    document.getElementById('restoran_id').value='';
    document.getElementById('nazivJela').value='';
    document.getElementById('sastojci').value='';
    document.getElementById('vremePripreme').value='';  
    document.getElementById('cena').value='';  
    document.getElementById('tezina').value='';  
}

//Funkcija sortiranja
function sortiraj(){
    $("#ucitavanjeTabele tr").remove();
    povuciPodatkeSaBaze(0,100);
}

//Funkcija odjavljivanja sa sistema - korisnik se vraca na pocetnu stranu
function odjava(){
    window.location.replace("index.html");
}

//Sakrivanje modala
function closeModal() {
$("#upravljanjeTabelom").modal('hide');
}
