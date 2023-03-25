var akun = []; // localstorage
var dataKontak = []; // sessionstorage

//  buat ngecek sudah atau belum datanya
if (localStorage.getItem("akun")) {
    akun = JSON.parse(localStorage.getItem("akun"));
}
if (sessionStorage.getItem("dataKontak")) {
    dataKontak = JSON.parse(sessionStorage.getItem("dataKontak"));
}

console.log(akun);
console.log(dataKontak);

function register() {
    var inputNama = document.getElementById("nama").value;
    var inputEmail = document.getElementById("email").value;
    var inputPassword = document.getElementById("password").value;
    var inputKonfirmasi = document.getElementById("konfirmasi").value;
    if (inputPassword == inputKonfirmasi) {
        akun.push({
            nama: inputNama,
            email: inputEmail,
            password: inputPassword
        });
        // disimpan kedalam localstorage
        localStorage.setItem("akun", JSON.stringify(akun)); // konversi ke string
        window.location = '/index.html'; // pindah halaman ke login
        alert("Register Berhasil");
    } else if (inputPassword == inputKonfirmasi) {
        alert("Password dan konfirmasi password tidak sesuai");
    } else {
        alert("Data tidak sesuai");
    }
}

function login() {
    var inputEmail = document.getElementById("email").value;
    var inputPassword = document.getElementById("password").value;
    var loginBerhasil = false;
    for (var i = 0; i < akun.length; i++) {
        if (inputEmail == akun[i]["email"] && inputPassword == akun[i]["password"]) {

            localStorage.setItem("username", akun[i]["nama"]);
            window.location = "/home_page.html";
            alert("Login Berhasil");
            loginBerhasil = true;
        }
    }
    if (loginBerhasil == false) {
        alert("Login gagal");
    }
}

function saveKontak() {
    var nama = document.getElementById("nama").value;
    var email = document.getElementById("email").value;
    var jenisKelamin = document.querySelector('input[name="jenis-kelamin"]:checked').value;
    var jenisKontak = document.getElementById("jenis-kontak").value;
    var pesan = document.getElementById("pesan").value
    dataKontak.push({
        nama: nama,
        email: email,
        jenisKelamin: jenisKelamin,
        jenisKontak: jenisKontak,
        pesan: pesan
    })
    sessionStorage.setItem("dataKontak", JSON.stringify(dataKontak)); // konversi ke string
    window.location.href = "contact.html";
    alert("Data anda sudah terkirim");
}

// menampilkan data kedalam table
if (document.getElementById("dataKontak")) {
    var rows = "";
    if(dataKontak.length == 0){
        var row = '<tr><td  colspan = "5"> <b>Data Kosong</b> </td><tr>';
        rows = rows + row;
    } else {
        dataKontak.map((row) => {
            var row = '<tr><td>' + row.nama + '</td><td>' + row.email + '</td><td>' + row.jenisKelamin + '</td><td>' + row.jenisKontak + '</td><td>' + row.pesan + '</td></tr>';
            rows = rows + row;
        })
    }
    var tbody = document.getElementById("dataKontak");
    tbody.innerHTML = rows;
}

if (document.getElementById("userLogin")) {
    if (localStorage.getItem("username")) {
        document.getElementById("userLogin").innerHTML = localStorage.getItem("username");
    }
}