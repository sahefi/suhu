
const express = require('express') //import express
const bodyParser = require('body-parser') //deklarasi body-parser
const req = require('express/lib/request')
const app = express()              //deklarasi variabel express
const port = 8080                  //deklarasi port

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {       // endpoint '/'
    res.send("Hello Programers!")
})

app.get('/orang/:nama', (req, res) => { //endpoint get untuk mendapatakan nama
    var namaOrang = req.params.nama //merequest nama pada endpoint untuk ditampilkan
    res.end('Menampilkan nama siswa:' + namaOrang)//menggunakan res.end untuk mengakhiri respon dan menampilkan hasil
})

app.post('/orang', (req, res) => {//endpoint post untuk membuat orang
    var namaOrang = req.body.nama//merequest nama menggunakan body pada endpoint untuk ditampilkan
    var alamat = req.body.alamat//merequest alamat menggunakan body pada endpoint untuk ditampilkan yang key sudah di deklrasikan di postman
    res.end('Menampilkan orang baru, atas nama: ' + namaOrang + ', yang beralamat di ' + alamat)//menggunakan res.end untuk mengakhiri respons dan menampilkan hasil
})

app.delete('/orang/:id', (req, res) => { //endpoint delete untuk menghapus orang dengan menggunakan id 
    var id = req.params.id // merequest id menggunakan params pada endpoint untuk ditampilkan
    var namaOrang = req.body.nama// merequest nama menggunakan body pada endpoint untuk ditampilkan
    res.end('ID' + id + ' telah dihapus, atas nama ' + namaOrang)//menggunakan res.end untuk mengakhiri respon dan menampilkan hasil
});

app.put('/orang/:id', (req, res) => {//endpoint put untuk update orang menggunakan id
    var id = req.params.id// merequest id menggunakan params pada endpoint untuk ditampilkan
    var namaOrang = req.body.nama// merequest nama menggunakan body pada endpoint untuk ditampilkan
    var alamat = req.body.alamat// merequest alamat menggunakan body pada endpoint untuk ditampilkan
    res.end('Seseorang dengan ID' + id + ', telah terupdate')//menggunakan res.end untuk mengakhiri respon dan menampilkan hasil
});

// data dummy
let nextId = 4;
const books = [{
    id: 1,
    title: "The First",
    year: 2019
},
{
    id: 2,
    title: "The Second",
    year: 2020
},
{
    id: 3,
    title: "The Third",
    year: 2021
},
];
app.get("/books", (req, res) => {
    res.send({
        message: "Berhasil menampilkan data buku",
        data: {
            books
        }
    })
})

app.post("/books", (req, res) => {
    const book = {
        id: nextId++,
        title: req.body.title,
        year: req.body.year,
    }
    books.push(book);
    res.send({
        message: "Berhasil menambahkan buku",
        data: {
            newBook: book,
            totalBooks: books.length,
        }
    })
})

//update data
app.put("/books/:id", (req, res) => {
    const id = req.params.id;
    const book = books.find(book => book.id == id);
    if (!book) {
        res.status(404).send({
            message: "Buku tidak ditemukan"
        })
    } else {
        book.title = req.body.title;
        book.year = req.body.year;
        res.send({
            message: "Berhasil mengubah buku",
            data: {
                book,
                totalBooks: books.length,
            }
        })
    }
})

//delete data
app.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const book = books.find(book => book.id == id);
    if (!book) {
        res.status(404).send({
            message: "Buku tidak ditemukan"
        })
    } else {
        const index = books.indexOf(book);
        books.splice(index, 1);
        res.send({
            message: "Berhasil menghapus buku",
            data: {
                book,
                totalBooks: books.length,
            }
        })
    }
})
// konversi suhu
//convert celsius to fahrenheit, kelvin, reamur using express
app.get("/convert/celcius/:suhu", (req, res) => {

    const suhu = parseInt(req.params.suhu);
    const fahrenheit = suhu * 1.8 + 32;
    const kelvin = suhu + 273;
    const reamur = suhu * 0.8;
    res.send({
        message: "Berhasil mengubah suhu",
        data: {
            fahrenheit,
            kelvin,
            reamur,
        }
    })
})

app.get("/convert/fahrenheit/:suhu", (req, res) => {

    const suhu = parseInt(req.params.suhu);
    const celsius = (suhu - 32) / 1.8;
    const kelvin = (suhu + 459.67) * 5 / 9;
    const reamur = (suhu - 32) * 4 / 9;
    res.send({
        message: "Berhasil mengubah suhu",
        data: {
            celsius,
            kelvin,
            reamur,
        }
    })
})

app.get("/convert/kelvin/:suhu", (req, res) => {
    const suhu = parseInt(req.params.suhu);
    const celsius = suhu - 273;
    const fahrenheit = suhu * 1.8 - 459.67;
    const reamur = suhu * 0.8 - 273;
    res.send({
        message: "Berhasil mengubah suhu",
        data: {
            celsius,
            fahrenheit,
            reamur,
        }
    })
})
//reamur
app.get("/convert/reamur/:suhu", (req, res) => {
    const suhu = parseInt(req.params.suhu);
    const celsius = suhu * 1.25;
    const fahrenheit = suhu * 2.25 + 32;
    const kelvin = suhu * 1.25 + 273;
    res.send({
        message: "Berhasil mengubah suhu",
        data: {
            celsius,
            fahrenheit,
            kelvin,
        }
    })
})

//convert decimal, binary, octal, hexadecimal using express
app.get("/convert/decimal/:angka", (req, res) => {
    const angka = parseInt(req.params.angka);
    const binary = angka.toString(2);
    const octal = angka.toString(8);
    const hexadecimal = angka.toString(16);
    res.send({
        message: "Berhasil mengubah angka",
        data: {
            binary,
            octal,
            hexadecimal,
        }
    })
})

app.get("/convert/binary/:angka", (req, res) => {
    const angka = parseInt(req.params.angka);
    const decimal = parseInt(angka, 2);
    const octal = parseInt(angka, 8);
    const hexadecimal = parseInt(angka, 16);
    res.send({
        message: "Berhasil mengubah angka",
        data: {
            decimal,
            octal,
            hexadecimal,
        }
    })
})

app.get("/convert/octal/:angka", (req, res) => {
    const angka = parseInt(req.params.angka);
    const decimal = parseInt(angka, 8);
    const binary = parseInt(angka, 2);
    const hexadecimal = parseInt(angka, 16);
    res.send({
        message: "Berhasil mengubah angka",
        data: {
            decimal,
            binary,
            hexadecimal,
        }
    })
})

app.get("/convert/hexadecimal/:angka", (req, res) => {
    const angka = parseInt(req.params.angka);
    const decimal = parseInt(angka, 16);
    const binary = parseInt(angka, 2);
    const octal = parseInt(angka, 8);
    res.send({
        message: "Berhasil mengubah angka",
        data: {
            decimal,
            binary,
            octal,
        }
    })
})

//calculate BMI using express
app.post("/bmi", (req, res) => {
    const { weight, height } = req.body;
    const bmi = weight / (height * height);
    //calculate category
    let category;
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight"
    } else if (bmi <= 30) {
        category = "Obese"
    } else {
        category = "Error"
    }
    res.send({
        message: "Berhasil menghitung BMI",
        data: {
            bmi,
            category,
        }
    })
})


app.listen(port, () => {//app.listen untuk memulai server pada port 8080
    console.log(`Server di port ${port}`)
})

