 // Script untuk menampilkan loading screen pada awal halaman dimuat
 document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loadingContainer").style.display = "flex"; // Menampilkan loading screen
    // Simulasi pengambilan data (setTimeout hanya untuk simulasi, bisa dihapus di produksi)
    setTimeout(function() {
        document.getElementById("loadingContainer").style.display = "none"; // Menyembunyikan loading screen setelah data diambil
        document.getElementById("mainContainer").style.display = "block"; // Menampilkan konten utama
    }, 2000); // Contoh waktu delay 2 detik untuk simulasi
});

// Fungsi untuk menyisipkan gambar dari penyimpanan lokal pengguna
function insertLocalImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        document.getElementById('editor').appendChild(img);
    }
    reader.readAsDataURL(file);
}

// Fungsi untuk menyisipkan tabel pada editor
function insertTable() {
    const table = document.createElement('table');
    const rows = 3; // Contoh jumlah baris
    const cols = 3; // Contoh jumlah kolom
    for (let i = 0; i < rows; i++) {
        const row = table.insertRow();
        for (let j = 0; j < cols; j++) {
            const cell = row.insertCell();
            cell.textContent = 'Cell';
        }
    }
    document.getElementById('editor').appendChild(table);
}

// Fungsi untuk menyimpan konten sebagai file HTML
function saveAsHTML() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
}

// Fungsi untuk menyimpan konten sebagai file PDF
function saveAsPDF() {
    const doc = new jsPDF();
    doc.html(document.getElementById('editor'), {
        callback: function (doc) {
            doc.save('document.pdf');
        },
        x: 10,
        y: 10
    });
}

// Fungsi untuk menyimpan konten sebagai file Word
function saveAsWord() {
    const content = document.getElementById('editor').innerHTML;
    const converted = htmlDocx.asBlob(content);
    saveAs(converted, 'document.docx');
}

// Fungsi untuk menyimpan konten sebagai file Excel
function saveAsExcel() {
    const content = document.getElementById('editor').innerHTML;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(document.getElementById('editor'));
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'document.xlsx');
}

// Fungsi untuk memformat teks di editor
function formatText(command, value = null) {
    document.execCommand(command, false, value);
}