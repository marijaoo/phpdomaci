function Prijavljivanje() {
                var u = $("#username");
                var p = $("#password");

                if (isNotEmpty(u) & isNotEmpty(p)) {
                    $.ajax({
                        url: "prijavljivanje.php",
                        method: "POST",
                        dataType: "text",
                        data: {
                            key: "login",
                            username: u.val(),
                            password: p.val(),
                        },
                        success: function (data) {
                            if (data == "ERROR") {
                                alert("Netacni podaci za prijavu. Pokusaj ponovo.");
                            } else {
                                window.location = "aplikacija.html";
                            }
                        },
                    });
                }
}

function OdlazakRegistracija(){

    window.location = "registracija.html";

}

function OdlazakPrijava(){

    window.location = "index.html";

}


function Registracija() {

                var name = $("#imeprezime");
                var username = $("#korisnickoIme");
                var password = $("#lozinka");
                var check = $("#lozinkaPotvrda");

                if (
                    isNotEmpty(name) &
                    isNotEmpty(username) &
                    isNotEmpty(password) &
                    isNotEmpty(check)
                ) {
                    if (password.val() == check.val()) {
                        $.ajax({
                            url: "registracija.php",
                            method: "POST",
                            dataType: "text",
                            data: {
                                name: name.val(),
                                username: username.val(),
                                password: password.val(),
                            },
                            success: function (data) {
                                if (data == "Podaci sačuvani!") {
                                    alert("Podaci sačuvani unutar baze podataka!");
                                    window.location = "index.html";
                                } else {
                                    alert(
                                        "Registracija neuspesna! Podaci nisu sacuvani u bazi, pokusaj ponovo! Greska " +
                                            data
                                    );
                                }
                            },
                        });
                    } else {
                        alert("Lozinke nisu iste.");
                        password.css("border", "1px solid red");
                        check.css("border", "1px solid red");
                    }
                }
}

            //logika sakrivanja password-a
            function hide(nesto) {
                var x = document.getElementById(nesto);
                if (x.type === "password") {
                    x.type = "text";
                } else x.type = "password";
            }

            //logika vizuelnog obracanja u slucaju da je forma prazna!
            function isNotEmpty(poziv) {
                if (poziv.val() == "") {
                    poziv.css("border", "1px solid red");
                    return false;
                } else poziv.css("border", "");
                return true;
            }