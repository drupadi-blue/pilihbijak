import { QuizQuestion } from '../types/game';

export const PRE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Uang belanja tersisa Rp500.000 untuk 1 minggu. Beras di rumah habis, dan anak butuh buku cetak sekolah. Di saat yang sama, ada promo panci diskon 50%. Apa tindakan paling tepat?",
    context: "Menentukan Skala Prioritas",
    options: [
      {
        id: "a",
        text: "Membeli panci promo terlebih dahulu karena jarang diskon besar, sementara kebutuhan beras meminjam dari tetangga.",
        isCorrect: false,
        explanation: "Panci adalah keinginan yang bisa ditunda. Mengorbankan kebutuhan pokok (beras) demi diskon adalah jebakan belanja konsumtif."
      },
      {
        id: "b",
        text: "Membeli semua barang menggunakan pinjaman online cepat cair agar seluruh keinginan keluarga langsung terbeli hari ini.",
        isCorrect: false,
        explanation: "Mengambil pinjaman berbunga untuk barang yang tidak mendesak akan membebani keuangan keluarga di kemudian hari."
      },
      {
        id: "c",
        text: "Mendahulukan membeli beras dan buku cetak sekolah anak, serta menunda pembelian panci promo sampai ada dana lebih.",
        isCorrect: true,
        explanation: "Tepat sekali! Kebutuhan pokok pangan dan pendidikan anak adalah prioritas utama (kebutuhan esensial) yang wajib didahulukan."
      },
      {
        id: "d",
        text: "Membeli panci dan beras saja, sedangkan buku cetak sekolah anak ditunda sampai semester depan agar tidak boros.",
        isCorrect: false,
        explanation: "Pendidikan anak adalah kebutuhan esensial masa depan keluarga yang tidak boleh dikorbankan demi perabotan non-mendesak."
      }
    ]
  },
  {
    id: 2,
    question: "Di supermarket ada 'Paket Promo Sembako Murah' Rp150.000 (berisi minyak goreng, tetapi dipaketkan dengan 3 kaleng biskuit manis dan sirup). Bagaimana sikap bijak ibu?",
    context: "Mengevaluasi Promo Belanja",
    options: [
      {
        id: "a",
        text: "Memeriksa kebutuhan di rumah: jika hanya memerlukan minyak goreng, lebih baik membeli minyak saja secara satuan di warung atau pasar.",
        isCorrect: true,
        explanation: "Tepat! Promo hanya menguntungkan jika barang di dalamnya memang masuk dalam daftar kebutuhan yang sudah direncanakan."
      },
      {
        id: "b",
        text: "Langsung mengambil paket tersebut karena merasa untung mendapatkan beberapa macam barang sekaligus dalam satu kardus.",
        isCorrect: false,
        explanation: "Banyak paket bundling sengaja mencampurkan barang yang sulit laku. Uang terbuang untuk barang yang sebenarnya tidak dibutuhkan keluarga."
      },
      {
        id: "c",
        text: "Membeli dua paket sekaligus mumpung sedang diskon untuk dijadikan stok camilan keluarga hingga beberapa bulan ke depan.",
        isCorrect: false,
        explanation: "Menghabiskan uang belanja tunai untuk stok camilan berlebihan dapat mengganggu pos pengeluaran darurat keluarga."
      },
      {
        id: "d",
        text: "Membayar paket promo tersebut memakai paylater karena sedang ada voucher potongan harga pengguna baru.",
        isCorrect: false,
        explanation: "Menggunakan fasilitas utang cicilan untuk makanan manis konsumtif akan menambah beban tagihan bulanan keluarga."
      }
    ]
  },
  {
    id: 3,
    question: "Ibu melihat tawaran pinjaman lewat pesan WhatsApp: 'Cair 5 menit, hanya butuh foto KTP, tanpa jaminan'. Apa risiko utama dari tawaran tersebut?",
    context: "Mengenali Risiko Pinjol Ilegal",
    options: [
      {
        id: "a",
        text: "Tidak ada risiko finansial apa pun selama uang pencairan tersebut langsung dibelanjakan untuk keperluan sehari-hari keluarga.",
        isCorrect: false,
        explanation: "Sangat keliru. Pinjaman tanpa kejelasan izin resmi membawa risiko teror pada keluarga dan bunga yang membengkak berlipat ganda."
      },
      {
        id: "b",
        text: "Tawaran tersebut merupakan program bantuan resmi modal usaha bergulir dari instansi pemerintah bagi ibu-ibu rumah tangga.",
        isCorrect: false,
        explanation: "Bantuan resmi pemerintah tidak pernah meminta masyarakat mencicil bunga harian apalagi disebar via nomor HP pribadi yang acak."
      },
      {
        id: "c",
        text: "Proses pencairan pinjaman hanya membutuhkan waktu tunggu transfer beberapa jam lebih lambat dari yang dijanjikan pesan.",
        isCorrect: false,
        explanation: "Risikonya jauh lebih berat daripada sekadar waktu pencairan, yakni jeratan denda berantai dan kebocoran data privasi keluarga."
      },
      {
        id: "d",
        text: "Pinjaman tersebut umumnya pinjol ilegal tanpa izin OJK, mengenakan bunga harian tinggi, potongan biaya awal besar, dan risiko penagihan kasar.",
        isCorrect: true,
        explanation: "Sangat benar! Ciri pinjol ilegal adalah menawarkan lewat SMS/WA pribadi tanpa izin OJK, bunga dihitung harian, dan meminta akses seluruh kontak HP."
      }
    ]
  },
  {
    id: 4,
    question: "Dalam prinsip keuangan syariah, mengapa pinjaman uang yang mewajibkan tambahan bunga pengembalian dilarang?",
    context: "Prinsip Keuangan Syariah & Riba",
    options: [
      {
        id: "a",
        text: "Karena membuat proses administrasi pencairan pinjaman menjadi memerlukan waktu verifikasi dokumen yang lebih panjang.",
        isCorrect: false,
        explanation: "Bukan soal cepat atau lambat, melainkan adanya ketidakadilan dalam penambahan beban utang tanpa transaksi riil."
      },
      {
        id: "b",
        text: "Karena pinjaman uang pada hakikatnya adalah tolong-menolong, sehingga mengambil keuntungan tambahan dari orang yang berutang adalah riba.",
        isCorrect: true,
        explanation: "Tepat! Dalam syariat Islam, uang tidak boleh 'beranak uang' dari transaksi pinjam-meminjam murni tanpa adanya jual beli barang atau jasa riil."
      },
      {
        id: "c",
        text: "Karena dalam ajaran agama seluruh transaksi jual beli kebutuhan keluarga hanya boleh dilakukan secara tunai tanpa dicicil.",
        isCorrect: false,
        explanation: "Islam memperbolehkan mencicil atau bertahap, asalkan melalui akad jual beli yang jelas dengan harga yang disepakati di awal tanpa bunga mengambang."
      },
      {
        id: "d",
        text: "Karena pihak pemberi pinjaman tidak mendapatkan bagian hadiah cinderamata atau bingkisan dari nasabah.",
        isCorrect: false,
        explanation: "Larangan riba berkaitan dengan keadilan sosial dan pencegahan eksploitasi orang yang sedang kesulitan, bukan soal souvenir."
      }
    ]
  },
  {
    id: 5,
    question: "Keluarga sedang memerlukan dana mendesak untuk biaya kesehatan. Apa langkah pertama yang wajib diperiksa sebelum menyetujui pembiayaan?",
    context: "Transparansi Akad & Kemampuan Bayar",
    options: [
      {
        id: "a",
        text: "Melihat hadiah promosi atau souvenir menarik yang dibagikan oleh pihak penyedia dana kepada calon nasabah baru.",
        isCorrect: false,
        explanation: "Hadiah promosi seringkali mengalihkan perhatian dari biaya cicilan yang mahal."
      },
      {
        id: "b",
        text: "Langsung menandatangani formulir pinjaman tanpa perlu membaca lembar syarat dan ketentuan agar uangnya bisa lekas cair.",
        isCorrect: false,
        explanation: "Tidak membaca perjanjian bisa membuat kita terjebak biaya denda dan aturan sepihak yang merugikan."
      },
      {
        id: "c",
        text: "Memeriksa legalitas izin OJK, kejelasan akad, rincian seluruh biaya cicilan, dan memastikan arus kas keluarga sanggup membayar.",
        isCorrect: true,
        explanation: "Tepat sekali! Memahami rincian perjanjian, izin resmi, dan kemampuan arus kas bulanan adalah kunci keselamatan keuangan keluarga."
      },
      {
        id: "d",
        text: "Mencari pinjaman dari perorangan tanpa identitas di grup media sosial yang menjanjikan syarat foto KTP saja.",
        isCorrect: false,
        explanation: "Meminjam kepada akun tanpa identitas resmi sangat berbahaya bagi keamanan aset dan nomor kontak keluarga."
      }
    ]
  },
  {
    id: 6,
    question: "Seorang kerabat dekat merekomendasikan fitur kredit Paylater di aplikasi belanja: 'Pakai ini saja, mumpung user baru ada diskon potongan Rp100.000 dan cashback tanpa uang muka'. Bagaimana Ibu mengevaluasi tawaran ini?",
    context: "Kritis Terhadap Rayuan Promo Pengguna Baru",
    options: [
      {
        id: "a",
        text: "Waspada bahwa tawaran diskon awal pengguna baru biasanya adalah strategi pemasaran agar terbiasa mencicil, lalu ada biaya bunga dan denda pada tagihan berikutnya.",
        isCorrect: true,
        explanation: "Sangat jeli! 'Diskon user baru' adalah strategi pemasaran agar konsumen ketagihan belanja kredit. Periksa apakah barang tersebut memang direncanakan dan bagaimana biaya cicilan ke depannya."
      },
      {
        id: "b",
        text: "Segera mendaftar dan berbelanja mumpung ada potongan harga cuma-cuma yang sayang jika dilewatkan begitu saja.",
        isCorrect: false,
        explanation: "Ini jebakan awal. Iming-iming potongan belanja dirancang agar kita terbiasa berutang dan berbelanja di luar kebutuhan."
      },
      {
        id: "c",
        text: "Mengajak seluruh anggota keluarga mendaftar akun baru bersama-sama agar mengumpulkan komisi saldo pendaftaran.",
        isCorrect: false,
        explanation: "Mengajak orang lain berutang kredit konsumtif dapat merugikan sahabat dan keluarga jika mereka tidak mampu membayar."
      },
      {
        id: "d",
        text: "Menggunakan seluruh limit paylater untuk dipinjamkan kembali kepada orang lain demi mencari keuntungan selisih.",
        isCorrect: false,
        explanation: "Meminjamkan dana utang kepada pihak ketiga sangat berisiko gagal bayar dan nama Ibu yang akan tercemar di riwayat kredit."
      }
    ]
  },
  {
    id: 7,
    question: "Iklan pinjaman menuliskan kalimat: 'Bunga ringan sekali, hanya seharga secangkir kopi Rp5.000 per hari untuk pinjaman Rp1.000.000'. Apa kenyataan hitungan finansial di balik kata manis ini?",
    context: "Membongkar Trik Bahasa Marketing",
    options: [
      {
        id: "a",
        text: "Tawaran tersebut sangat murah dan menguntungkan peminjam karena nilainya sebanding dengan harga minuman saset harian.",
        isCorrect: false,
        explanation: "Analogi kopi sengaja dipakai agar terlihat kecil. Padahal jika dihitung bulanan dan tahunan, angkanya sangat besar."
      },
      {
        id: "b",
        text: "Pihak penyedia pinjaman akan memberikan voucher minuman kopi gratis setiap kali nasabah selesai membayar cicilan pinjaman.",
        isCorrect: false,
        explanation: "Tentu bukan kopi sungguhan, itu adalah beban uang kas riil yang akan dipotong dari dompet Ibu."
      },
      {
        id: "c",
        text: "Menandakan bahwa pinjaman ini dikelola oleh koperasi UMKM kedai kopi resmi binaan kelurahan setempat.",
        isCorrect: false,
        explanation: "Istilah kopi di sini hanyalah majas perbandingan iklan untuk menyamarkan tingginya suku bunga sesungguhnya."
      },
      {
        id: "d",
        text: "Biaya Rp5.000 per hari berarti Rp150.000 per bulan (15% per bulan atau 180% per tahun!), angka bunga yang sangat mahal dan memberatkan kas rumah tangga.",
        isCorrect: true,
        explanation: "Luar biasa kritis! Rp5.000 x 30 hari = Rp150.000 per bulan untuk pinjaman 1 juta rupiah (180% setahun!). Jauh lebih mahal dari pembiayaan resmi bank syariah atau pegadaian syariah."
      }
    ]
  },
  {
    id: 8,
    question: "Ada ajakan di grup media sosial untuk ikut 'Arisan Get Online': menyetor Rp500.000 minggu ini dan dijanjikan pasti cair Rp1.500.000 minggu depan tanpa perlu berdagang. Bagaimana sikap bijak seorang ibu?",
    context: "Kewaspadaan Terhadap Arisan Berantai Bodong",
    options: [
      {
        id: "a",
        text: "Menyetor uang dengan nominal besar mumpung ada kesempatan melipatgandakan simpanan keluarga dalam waktu beberapa hari.",
        isCorrect: false,
        explanation: "Keuntungan fantastis tanpa usaha riil adalah tanda pasti penipuan skema ponzi yang akan merugikan uang belanja keluarga."
      },
      {
        id: "b",
        text: "Menolak tegas karena skema keuntungan tanpa usaha riil tersebut merupakan ciri penipuan berantai yang merugikan dan dilarang syariat.",
        isCorrect: true,
        explanation: "Tepat sekali! Dalam Islam, perolehan harta harus jelas perniagaannya dan bebas dari penipuan (Gharar) serta memakan harta orang lain secara bathil."
      },
      {
        id: "c",
        text: "Meminjam modal dagang suami terlebih dahulu untuk mencoba ikut satu kali putaran demi membuktikan kebenarannya.",
        isCorrect: false,
        explanation: "Mempertaruhkan uang operasional nafkah keluarga untuk spekulasi bodong sangat membahayakan ekonomi rumah tangga."
      },
      {
        id: "d",
        text: "Menggadaikan perhiasan mas kawin ke toko emas pinggir jalan untuk ikut serta dalam beberapa putaran arisan get.",
        isCorrect: false,
        explanation: "Menggadaikan aset berharga keluarga demi skema investasi bodong adalah keputusan spekulatif yang berujung kerugian total."
      }
    ]
  },
  {
    id: 9,
    question: "Ibu melihat tulisan promosi: 'Cicilan 0% Bunga untuk barang elektronik idaman, cukup membayar biaya administrasi Rp75.000 per bulan'. Apakah penawaran ini benar-benar bebas dari biaya tambahan?",
    context: "Membedah Trik Cicilan Nol Persen",
    options: [
      {
        id: "a",
        text: "Benar-benar gratis tanpa beban tambahan karena dalam judul spanduk sudah tertera tulisan nol persen bunga yang jelas.",
        isCorrect: false,
        explanation: "Ini adalah trik penamaan. Bunga dihilangkan dari nama, namun dimasukkan kembali dengan istilah 'biaya administrasi bulanan'."
      },
      {
        id: "b",
        text: "Biaya tersebut merupakan sumbangan sukarela yang boleh dibayar ataupun tidak dibayar oleh pihak pembeli barang.",
        isCorrect: false,
        explanation: "Biaya administrasi cicilan selalu bersifat wajib dan mengikat dalam tagihan bulanan pembeli."
      },
      {
        id: "c",
        text: "Biaya administrasi tersebut otomatis dikembalikan secara utuh menjadi saldo tabungan belanja saat cicilan telah lunas.",
        isCorrect: false,
        explanation: "Biaya administrasi bulanan adalah pendapatan perusahaan pembiayaan yang tidak akan pernah dikembalikan ke nasabah."
      },
      {
        id: "d",
        text: "Tidak gratis, karena biaya administrasi bulanan Rp75.000 itu pada kenyataannya adalah biaya bunga terselubung yang diberi nama lain agar terkesan murah.",
        isCorrect: true,
        explanation: "Tepat sekali! Membayar Rp75.000 per bulan selama 12 bulan berarti ada tambahan Rp900.000. Ibu yang bijak selalu menghitung total uang yang keluar."
      }
    ]
  },
  {
    id: 10,
    question: "Menurut pemahaman Ibu, apa tujuan utama mengelola keuangan keluarga secara tertib dan menghindari utang konsumtif?",
    context: "Tujuan Pengelolaan Keuangan Berkah",
    options: [
      {
        id: "a",
        text: "Supaya keluarga terlihat paling berada dan memiliki banyak barang mewah terbaru di hadapan tetangga dan kerabat.",
        isCorrect: false,
        explanation: "Menumpuk barang konsumtif demi pandangan orang lain adalah pintu awal krisis keuangan keluarga."
      },
      {
        id: "b",
        text: "Hanya untuk menyimpan seluruh uang di lemari dan tidak membelanjakannya sama sekali meskipun anak membutuhkan buku sekolah.",
        isCorrect: false,
        explanation: "Pelit menahan nafkah yang dibutuhkan anak juga bukan cara mengelola keuangan yang sehat atau syar'i."
      },
      {
        id: "c",
        text: "Menjaga ketahanan nafkah keluarga, memastikan kebutuhan anak terpenuhi, dan hidup tenteram bebas dari kejaran tagihan utang.",
        isCorrect: true,
        explanation: "Luar biasa! Inilah hakikat PILIH BIJAK: rezeki berkah, kebutuhan keluarga tercukupi secara bermartabat, dan batin hidup tenang."
      },
      {
        id: "d",
        text: "Agar keluarga dapat menaikkan batas limit pinjaman paylater dan kartu kredit setinggi-tingginya di kemudian hari.",
        isCorrect: false,
        explanation: "Mengejar limit pinjaman konsumtif yang tinggi justru memperbesar risiko jebakan utang di masa mendatang."
      }
    ]
  }
];

export const POST_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Jika dihadapkan pada pilihan antara memperbaiki kulkas yang rusak dengan biaya Rp250.000 atau langsung mencicil kulkas baru lewat Paylater Rp350.000/bulan selama setahun, mana yang paling bijak?",
    context: "Evaluasi Solusi & Beban Utang",
    options: [
      {
        id: "a",
        text: "Langsung mengambil kulkas baru agar rumah terlihat lebih bagus di depan tetangga meskipun harus membayar cicilan selama satu tahun.",
        isCorrect: false,
        explanation: "Membeli barang karena gengsi dengan cicilan panjang akan mengikat penghasilan keluarga dan memicu stres keuangan."
      },
      {
        id: "b",
        text: "Memeriksa dan memperbaiki kulkas yang ada terlebih dahulu selama masih layak pakai untuk menghemat jutaan rupiah uang keluarga.",
        isCorrect: true,
        explanation: "Hebat! Pilihan bijak adalah mengoptimalkan barang yang ada. Menghemat jutaan rupiah dari cicilan yang tidak perlu menjaga stabilitas kas keluarga."
      },
      {
        id: "c",
        text: "Membiarkan saja kulkas tersebut rusak dan membuang semua bahan makanan jualan yang ada di dalamnya setiap hari.",
        isCorrect: false,
        explanation: "Membiarkan makanan membusuk menimbulkan mubazir (pemborosan) yang dilarang."
      },
      {
        id: "d",
        text: "Meminjam uang ke rentenir keliling pasar untuk membeli kulkas dua pintu secara tunai hari ini.",
        isCorrect: false,
        explanation: "Meminjam ke rentenir dengan bunga harian yang mencekik jauh lebih berbahaya bagi keutuhan ekonomi rumah tangga."
      }
    ]
  },
  {
    id: 2,
    question: "Apa perbedaan mendasar antara Gadai Emas di Pegadaian Syariah resmi dengan meminjam uang di Pinjol Bunga Harian?",
    context: "Lembaga Keuangan Indonesia & Nilai Syariah",
    options: [
      {
        id: "a",
        text: "Kedua lembaga tersebut memiliki cara kerja dan beban biaya yang sama persis sehingga ibu rumah tangga bebas memilih yang mana saja.",
        isCorrect: false,
        explanation: "Sangat berbeda! Pinjol tanpa agunan mengenakan bunga harian tinggi dan denda berantai, sedangkan Pegadaian Syariah terdaftar OJK dan diawasi Dewan Pengawas Syariah."
      },
      {
        id: "b",
        text: "Pinjol lebih menguntungkan karena tidak meminta nasabah memiliki barang simpanan berharga apa pun saat mengajukan dana tunai.",
        isCorrect: false,
        explanation: "Justru pinjol tanpa agunan seringkali menyandera privasi dan kontak nomor handphone sebagai ganti jaminan."
      },
      {
        id: "c",
        text: "Pegadaian Syariah hanya menerima nasabah dari kalangan pengusaha emas besar dan menolak pengajuan gadai ibu rumah tangga.",
        isCorrect: false,
        explanation: "Pegadaian Syariah terbuka melayani seluruh lapisan masyarakat mulai dari nilai taksiran emas gram kecil."
      },
      {
        id: "d",
        text: "Di Pegadaian Syariah ada barang jaminan resmi yang disimpan di brankas aman OJK dengan biaya titip pemeliharaan (ujrah), bukan membungakan uang.",
        isCorrect: true,
        explanation: "Tepat sekali! Pegadaian Syariah menggunakan akad Rahn & Ijarah. Biaya yang dikenakan adalah upah jasa pemeliharaan barang titipan, bukan membungakan uang."
      }
    ]
  },
  {
    id: 3,
    question: "Bagaimana cara seorang ibu menguji apakah promo 'Beli 2 Gratis 1' di toko sembako benar-benar menghemat uang belanja keluarga?",
    context: "Mengevaluasi Kebutuhan Riil Belanja",
    options: [
      {
        id: "a",
        text: "Menanyakan pada diri: 'Apakah keluarga memang membutuhkan barang ini sekarang, dan apakah uangnya tersedia tanpa mengganggu pos lain?'.",
        isCorrect: true,
        explanation: "Bagus sekali! Slogan kita: 'Bukan Sekadar Hemat, tetapi Tepat.' Hemat sejati adalah membelanjakan uang pada hal yang benar-benar bernilai guna."
      },
      {
        id: "b",
        text: "Semua promo bertuliskan gratis pasti menguntungkan, jadi wajib diborong meskipun uang kas belanja dapur harus terpakai habis.",
        isCorrect: false,
        explanation: "Jika keluarga sebenarnya hanya butuh 1 buah, membeli 2 buah berarti mengeluarkan uang kas lebih banyak untuk hal yang belum tentu habis terpakai."
      },
      {
        id: "c",
        text: "Membeli sebanyak mungkin mumpung gratis lalu menyimpannya di gudang dapur meskipun masa kedaluwarsa barang tersebut sudah sangat dekat.",
        isCorrect: false,
        explanation: "Menimbun barang promo yang lewat masa kedaluwarsa berujung kerugian dan pemborosan."
      },
      {
        id: "d",
        text: "Mengajak warga satu RT patungan membeli promo tersebut menggunakan kas dana arisan yang belum diundi.",
        isCorrect: false,
        explanation: "Menggunakan dana amanah kas bersama untuk belanja promo pribadi adalah tindakan yang melanggar amanah."
      }
    ]
  },
  {
    id: 4,
    question: "Seorang kerabat meminjamkan uang Rp500.000 kepada tetangga yang sakit tanpa meminta tambahan uang lebih sepeser pun saat dikembalikan. Akad terpuji ini disebut:",
    context: "Pemahaman Pinjaman Tolong-Menolong",
    options: [
      {
        id: "a",
        text: "Transaksi Utang Berbunga (Akad Riba), karena peminjam wajib memberikan hadiah tambahan uang tunai setiap kali bertemu pemberi pinjaman.",
        isCorrect: false,
        explanation: "Riba justru adalah penambahan keuntungan yang disyaratkan atas utang. Pinjaman kerabat ini bersih dari unsur riba."
      },
      {
        id: "b",
        text: "Lelang Bebas, karena barang milik peminjam langsung disita dan dijual kepada warga sekitar yang menawar harga paling tinggi.",
        isCorrect: false,
        explanation: "Lelang adalah mekanisme jual beli barang kepada penawar tertinggi, bukan pinjaman kebajikan."
      },
      {
        id: "c",
        text: "Pinjaman Kebajikan Murni (Akad Qardh Hasan), yaitu memberi pinjaman tulus untuk tolong-menolong tanpa mengambil keuntungan sepihak.",
        isCorrect: true,
        explanation: "Tepat sekali! Qardh Hasan adalah pinjaman tanpa bunga dan tanpa syarat keuntungan duniawi, semata-mata membantu sesama yang kesulitan."
      },
      {
        id: "d",
        text: "Akad Bagi Hasil Investasi (Mudharabah), di mana tetangga yang sakit diwajibkan menyetorkan dividen keuntungan bulanan.",
        isCorrect: false,
        explanation: "Mudharabah adalah akad permodalan usaha perniagaan, bukan pinjaman dana berobat sosial."
      }
    ]
  },
  {
    id: 5,
    question: "Keputusan keuangan yang 'Bijak dan Berkah' bagi seorang ibu rumah tangga pada hakikatnya dinilai dari apa?",
    context: "Filosofi 'Bukan Sekadar Hemat, tetapi Tepat'",
    options: [
      {
        id: "a",
        text: "Hanya dinilai dari siapa yang menyimpan uang paling banyak di dompet, sekalipun kebutuhan makan dan sekolah anak diabaikan.",
        isCorrect: false,
        explanation: "Menelantarkan anak sekolah demi menyimpan uang bukanlah cara mengelola keuangan yang sehat atau syar'i."
      },
      {
        id: "b",
        text: "Siapa yang paling pintar mengumpulkan banyak kartu kredit dan fasilitas paylater untuk membeli perabotan rumah terbaru.",
        isCorrect: false,
        explanation: "Menumpuk fasilitas kredit konsumtif demi gaya hidup adalah awal dari kerentanan keuangan rumah tangga."
      },
      {
        id: "c",
        text: "Seberapa sering ibu memenangkan undian berhadiah belanja dari aplikasi pinjaman online kilat.",
        isCorrect: false,
        explanation: "Mengandalkan keberuntungan undian dari aplikasi utang bukanlah tanda keberhasilan pengelolaan keuangan keluarga."
      },
      {
        id: "d",
        text: "Keseimbangan antara kebutuhan penting keluarga terpenuhi secara bermartabat, terhindar dari jeratan utang, dan batin keluarga tenteram.",
        isCorrect: true,
        explanation: "Luar biasa! Inilah hakikat PILIH BIJAK: menjaga keselamatan dunia dan akhirat, mengutamakan tanggung jawab nafkah, serta menjauhi hal yang membahayakan keluarga."
      }
    ]
  },
  {
    id: 6,
    question: "Ketika melihat penawaran: 'Beli barang elektronik baru, cicilan 0% Bunga, cukup membayar biaya langganan admin Rp75.000 per bulan', apa kesimpulan kritis Ibu?",
    context: "Membongkar Trik Bunga Terselubung",
    options: [
      {
        id: "a",
        text: "Iklan tersebut benar-benar bebas dari biaya tambahan karena judulnya dengan jelas mencantumkan angka nol persen bunga.",
        isCorrect: false,
        explanation: "Ini adalah trik penamaan. Bunga dihilangkan dari judul, namun dibebankan lewat nama lain."
      },
      {
        id: "b",
        text: "Bukan gratis murni. Biaya penanganan bulanan itu pada hakikatnya adalah bunga terselubung yang menggantikan istilah bunga agar terkesan murah.",
        isCorrect: true,
        explanation: "Tepat sekali! Membayar Rp75.000 per bulan selama 12 bulan berarti ada biaya ekstra Rp900.000. Ibu yang bijak selalu menghitung total uang yang keluar."
      },
      {
        id: "c",
        text: "Biaya administrasi tersebut merupakan pajak resmi pembangunan daerah yang dipungut oleh pihak kelurahan setempat.",
        isCorrect: false,
        explanation: "Biaya administrasi cicilan komersial adalah keuntungan perusahaan kredit, bukan pajak daerah."
      },
      {
        id: "d",
        text: "Biaya administrasi tersebut boleh dicicil di tahun depan tanpa adanya sanksi denda keterlambatan.",
        isCorrect: false,
        explanation: "Biaya cicilan selalu ditagihkan setiap bulan dan keterlambatan pembayaran akan menimbulkan denda tambahan."
      }
    ]
  },
  {
    id: 7,
    question: "Jika keluarga mendadak membutuhkan dana siaga untuk keperluan darurat, mana urutan langkah pendanaan yang paling bijak dan selamat dari riba?",
    context: "Urutan Solusi Likuiditas Berkah",
    options: [
      {
        id: "a",
        text: "Segera mengunduh 3 aplikasi pinjol berbeda di handphone agar dana pinjaman yang didapatkan bisa langsung berjumlah banyak.",
        isCorrect: false,
        explanation: "Ini adalah awal dari bencana gali lubang tutup lubang yang menghancurkan keuangan rumah tangga."
      },
      {
        id: "b",
        text: "Meminjam uang tunai kepada rentenir keliling pasar karena prosesnya tidak memerlukan kelengkapan kartu tanda penduduk.",
        isCorrect: false,
        explanation: "Rentenir keliling (bank emok) menerapkan bunga harian yang menjebak ibu-ibu dalam jeratan utang tak berujung."
      },
      {
        id: "c",
        text: "1. Mengoptimalkan kas tabungan, 2. Meminjam kerabat tanpa bunga (Qardh Hasan), 3. Memanfaatkan Pegadaian Syariah resmi (Akad Rahn emas).",
        isCorrect: true,
        explanation: "Hebat sekali! Inilah tangga solusi finansial yang sehat: mulai dari sumber mandiri, bantuan kekeluargaan tanpa bunga, lalu lembaga syariah resmi berizin OJK."
      },
      {
        id: "d",
        text: "Menjual murah rumah warisan keluarga kepada tengkulak untuk mendapatkan uang tunai instan hari itu juga.",
        isCorrect: false,
        explanation: "Menjual aset pokok tempat tinggal keluarga secara terburu-buru adalah kepanikan yang menimbulkan kerugian sangat besar."
      }
    ]
  },
  {
    id: 8,
    question: "Dalam prinsip Bank Syariah Indonesia (BSI), pinjaman uang semata-mata adalah sarana tolong-menolong, bukan bisnis membungakan uang. Mengapa prinsip ini sangat penting bagi ibu rumah tangga?",
    context: "Nilai Luhur Perbankan Syariah",
    options: [
      {
        id: "a",
        text: "Agar terwujud keadilan, tidak ada pihak yang dizalimi saat kesulitan ekonomi, dan nafkah yang dibawa pulang ke rumah dipenuhi keberkahan.",
        isCorrect: true,
        explanation: "Masya Allah, sangat tepat! Inilah inti literasi keuangan syariah BSI: menjamin transaksi yang adil, transparan, saling meridhai, dan membawa ketenteraman batin bagi seluruh anggota keluarga."
      },
      {
        id: "b",
        text: "Agar masyarakat diperbolehkan membelanjakan uang sesuka hati tanpa memiliki kewajiban untuk melunasi kembali pinjaman.",
        isCorrect: false,
        explanation: "Utang tetap wajib dilunasi sesuai kesepakatan janji akad."
      },
      {
        id: "c",
        text: "Supaya ibu rumah tangga tidak perlu lagi membuat catatan buku belanja pengeluaran harian di rumah.",
        isCorrect: false,
        explanation: "Mencatat dan mengendalikan pengeluaran justru merupakan anjuran kuat dalam syariat Islam."
      },
      {
        id: "d",
        text: "Supaya nasabah perbankan otomatis dibebaskan dari kewajiban berikhtiar mencari nafkah halal.",
        isCorrect: false,
        explanation: "Perbankan syariah mendorong etos kerja dan ikhtiar perniagaan yang halal dan produktif."
      }
    ]
  },
  {
    id: 9,
    question: "Bagaimana cara membedakan akad jual beli yang jelas (seperti pembiayaan Murabahah di bank syariah) dengan pinjaman berbunga biasa?",
    context: "Memahami Akad Jual Beli vs Utang Berbunga",
    options: [
      {
        id: "a",
        text: "Kedua jenis transaksi tersebut sama saja dan hanya berbeda seragam yang dikenakan oleh pegawai bank yang melayani nasabah.",
        isCorrect: false,
        explanation: "Secara hukum fiqih muamalah dan undang-undang perbankan, akad jual beli barang riil sangat berbeda dengan meminjamkan uang berbunga."
      },
      {
        id: "b",
        text: "Pada bank syariah barang yang dibeli otomatis menjadi milik bank selamanya dan nasabah tidak diperkenankan memakainya di rumah.",
        isCorrect: false,
        explanation: "Barang yang dibeli melalui akad jual beli sah menjadi hak milik penuh nasabah setelah transaksi disepakati."
      },
      {
        id: "c",
        text: "Bank syariah selalu mewajibkan nasabah menukarkan uang ke mata uang asing sebelum membeli barang kebutuhan dapur.",
        isCorrect: false,
        explanation: "Transaksi di bank syariah di Indonesia sepenuhnya menggunakan mata uang Rupiah sesuai kebutuhan masyarakat."
      },
      {
        id: "d",
        text: "Pada jual beli syariah, barangnya riil, harga beli dan keuntungan disepakati pasti di awal, serta cicilannya tetap tanpa bunga mengambang.",
        isCorrect: true,
        explanation: "Tepat sekali! Bank syariah membelikan barang riil yang dibutuhkan nasabah lalu menjualnya dengan keuntungan margin yang jelas dan cicilan tetap."
      }
    ]
  },
  {
    id: 10,
    question: "Seorang ibu yang memegang amanah keuangan rumah tangga dikatakan berhasil menerapkan prinsip 'PILIH BIJAK!' apabila:",
    context: "Karakter Ibu Bijak Finansial",
    options: [
      {
        id: "a",
        text: "Selalu menuruti semua keinginan anak dan tren belanja terbaru meskipun harus mengambil utang cicilan di mana-mana.",
        isCorrect: false,
        explanation: "Menuruti keinginan konsumtif dengan utang adalah pangkal stres keuangan rumah tangga."
      },
      {
        id: "b",
        text: "Menyimpan seluruh uang belanja tanpa pernah mau membeli bahan makanan yang bergizi bagi tumbuh kembang anak-anaknya.",
        isCorrect: false,
        explanation: "Pelit menahan gizi makanan anak juga bertentangan dengan amanah seorang ibu."
      },
      {
        id: "c",
        text: "Mampu memilah antara kebutuhan nyata dan keinginan sesaat, cermat menghitung konsekuensi, serta memilih solusi yang berkah dan halal.",
        isCorrect: true,
        explanation: "Luar biasa sempurna! Inilah ringkasan utuh 'Bukan Sekadar Hemat, tetapi Tepat': cerdas, teliti, bertanggung jawab, dan mengutamakan keberkahan rezeki keluarga."
      },
      {
        id: "d",
        text: "Berhasil mengajak tetangga satu RT berutang bersama-sama demi mendapatkan hadiah bonus payung promosi toko.",
        isCorrect: false,
        explanation: "Mengajak orang lain berutang demi bonus hadiah kecil merusak ketahanan ekonomi komunitas warga."
      }
    ]
  }
];
