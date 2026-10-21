export interface GlossaryItem {
  term: string;
  category: 'Prinsip Syariah' | 'Produk Keuangan' | 'Waspada Keuangan';
  simpleMeaning: string;
  exampleInDailyLife: string;
  badgeColor: string;
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: "Riba (Bunga Uang)",
    category: "Prinsip Syariah",
    simpleMeaning: "Tambahan uang yang disyaratkan atas transaksi pinjam-meminjam uang tanpa ada transaksi barang/jasa riil. Hukumnya dilarang dalam Islam karena mengandung unsur ketidakadilan dan mengeksploitasi pihak yang butuh.",
    exampleInDailyLife: "Ibu meminjam Rp1.000.000, lalu diwajibkan mengembalikan Rp1.300.000 semata-mata karena pertambahan waktu. Tambahan Rp300.000 itulah riba.",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200"
  },
  {
    term: "Akad Rahn (Gadai Syariah)",
    category: "Prinsip Syariah",
    simpleMeaning: "Menahan suatu barang berharga milik peminjam (seperti emas/logam mulia) sebagai jaminan atas pinjaman darurat. Diterapkan resmi di Pegadaian Syariah dan Bank Syariah.",
    exampleInDailyLife: "Ibu menitipkan cincin emas 2 gram di Pegadaian Syariah untuk pinjam uang cepat. Emas ibu disimpan aman di brankas OJK, bukan untuk dipakai atau dijual sepihak.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
  },
  {
    term: "Biaya Mu'nah (Ujrah Pemeliharaan)",
    category: "Prinsip Syariah",
    simpleMeaning: "Upah atau biaya riil untuk jasa pemeliharaan, keamanan brankas, dan asuransi atas barang gadai yang dititipkan. Biaya ini dihitung dari nilai taksiran barang, bukan dari persentase bunga uang pinjaman.",
    exampleInDailyLife: "Di Pegadaian Syariah, biaya Rp16.000/bulan adalah ongkos menjaga emas ibu agar tidak dicuri, diasuransikan, dan dirawat secara profesional.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
  },
  {
    term: "Akad Qardh Hasan (Pinjaman Kebajikan)",
    category: "Prinsip Syariah",
    simpleMeaning: "Pinjaman murni untuk tolong-menolong tanpa mengambil keuntungan sama sekali. Yang dipinjam Rp500.000, yang dikembalikan tetap Rp500.000.",
    exampleInDailyLife: "Kas sosial masjid atau pinjaman dari saudara kandung saat keluarga sakit. Peminjam wajib berniat dan berikhtiar melunasi tepat waktu.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
  },
  {
    term: "Akad Murabahah (Jual Beli Margin)",
    category: "Prinsip Syariah",
    simpleMeaning: "Akad jual beli di mana bank syariah membelikan barang yang dibutuhkan nasabah (misal kulkas/motor), lalu menjualnya kepada nasabah dengan menyebutkan harga beli dan keuntungan margin yang disepakati bersama sejak awal.",
    exampleInDailyLife: "Harga kulkas Rp3.000.000. Bank membeli kulkas tersebut, lalu menjual kepada ibu seharga Rp3.300.000 dicicil 10 bulan @Rp330.000 tetap flat tanpa denda bunga mengambang.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
  },
  {
    term: "Pinjol Ilegal & Bank Emok (Rentenir)",
    category: "Waspada Keuangan",
    simpleMeaning: "Penyedia pinjaman tanpa izin OJK yang menawarkan uang cepat lewat SMS/WA atau mendatangi rumah warga. Menarik bunga harian mencekik, memotong biaya di awal, dan menyebarkan data pribadi saat telat bayar.",
    exampleInDailyLife: "Pinjam Rp1.000.000 tapi yang cair hanya Rp800.000. Tiap hari kena bunga 0.4% (12% per bulan). Nomor kontak teman dan keluarga diteror jika telat 1 hari.",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200"
  },
  {
    term: "Paylater (Beli Sekarang Bayar Nanti)",
    category: "Produk Keuangan",
    simpleMeaning: "Fitur pinjaman konsumtif instan di aplikasi belanja. Terlihat memudahkan saat tidak punya uang tunai, tetapi seringkali memiliki biaya penanganan bulanan yang mahal jika dihitung tahunan.",
    exampleInDailyLife: "Membeli baju atau kosmetik pakai paylater. Jika cicilan menumpuk dari 5 aplikasi berbeda, gaji suami bisa habis hanya untuk membayar bunga paylater.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
  },
  {
    term: "Israf & Tabdzir (Pemborosan)",
    category: "Prinsip Syariah",
    simpleMeaning: "Perilaku membelanjakan harta secara berlebih-lebihan melampaui batas kewajaran (Israf) atau mengeluarkan harta untuk hal-hal yang sia-sia dan tidak ada manfaatnya (Tabdzir).",
    exampleInDailyLife: "Membeli paket promo sembako 5 kardus padahal uang belanja minim, atau membeli perabotan baru hanya demi gengsi arisan.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
  }
];
