export interface ComicPanel {
    id: string;
    imageUrl?: string;
    imageAlt?: string;
    text: string;
    speaker: 'narrator' | 'character';
    characterName?: string;
    align: 'left' | 'right' | 'center';
}

export interface ComicChapter {
    id: string;
    title: string;
    panels: ComicPanel[];
}

export interface Subchapter {
    id: string;
    title: string;
    content: string; // HTML or Markdown string for the actual reading material
    subchapters?: Subchapter[];
}

export interface ArticleChapter {
    id: string;
    title: string;
    subchapters: Subchapter[];
}

export interface BlogPost {
    id: number;
    type?: 'standard' | 'comic' | 'structured';
    category: string;
    title: string;
    description: string;
    author?: string;
    date?: string;
    imageAlt: string;
    color: string;
    coverImage?: string;
    content: string; // The full article text (markdown or HTML or plain text)
    chapters?: ComicChapter[]; // Deprecated, but keeping for reference if needed
    articleChapters?: ArticleChapter[]; // For 'structured' articles
}

export const blogPosts: BlogPost[] = [
    {
        id: 4,
        type: 'structured',
        category: '',
        title: 'Opening',
        author: 'Muhammad Fikri Nabawi',
        date: 'May 22, 2026',
        description: 'Pada bagian ini, isi artikel dibuat untuk berbagi sedikit cerita dan pengalaman, sama alasan mengapa aku membuat blog ini.',
        imageAlt: 'Ilustrasi pembukaan blog',
        color: 'blue',
        content: '',
        articleChapters: [
            {
                id: 'chapter-1',
                title: 'Bagian 1',
                subchapters: [
                    {
                        id: 'pengalaman',
                        title: 'Pengalaman & Alasan',
                        content: `
                            <p className="mb-6">Di opening ini, aku mohon izin untuk sedikit berbagi cerita dan pengalaman alasan aku ingin membuat blog ini. Pada intinya dari opening ini aku cuma pengen bilang ternyata prospek farmasi itu sebenarnya luas banget temen-temen. Ya.. meskipun sepanjang aku sedang menjalani farmasi, aku ada belok kesana-kesini, tapi tetap satu tujuan bahwa sebenarnya aku itu emang di jalan tentang farmasi. Nahh.. aku harap setelah temen-temen telah membaca dari opening ini bisa membantu dan mendorong semangat teman-teman yang sedang belajar farmasi.</p>
                            <br>
                            <p className="mb-6">Pertama, sesuai dengan tema dan mungkin slogan yang udah pakem dari blog ini yaitu mengulik dan mengungkapkan dunia kesehatan melalui dunia atomik. Tema ini aku ambil karena selain aku yang berlatar belakang farmasi, tapi juga karena aku suka banget dengan fisika kuantum atau yaa.. pokoknya segala sesuatu yang membahas tentang atomik. Kesannya jadi tidak nyambung yaa? Farmasi tapi suka sama fisika kuantum?. </p>
                            <p className="mb-6">Jadi cerita singkatnya, semua berawal pada saat aku masih SMA. Waktu SMA itu aku suka banget dengan matematika dan fisika termasuk ilmu fisika kuantum atau mekanika kuantum. Sehari-hari selama masa SMA, aku selalu habisin waktuku dengan membaca huruf, angka, dan simbol matematika dari fisika termasuk fisika kuantum. Bahkan yang paling lucunya adalah dikala sedang berkabung dengan masa-masa untuk masuk universitas, membaca matematika atau membaca rumus-rumus matematika yanga ada di dalam fisika kuantum malah jadi suatu pelarian di saat aku sedang gundah wkwkwk😂. Gak hanya membaca aja dari berbagai buku, aku juga dapet pencerahan tentang fisika kuantum melalui film-film kayak contohnya film The Theory of Everything atau juga dari dosen-dosen online biasanya dari YouTube yang membahas tentang fisika kuantum. </p>
                            <p className="mb-6">Kenapa suka fisika kuantum atau mekanika kuantum bukan suka sama dia (upss..😄)?  Sebenarnya satu alasan yaitu aku suka dengan tantangan apalagi dunia kuantum itu di dalamnya penuh dengan ketidakpastian. Nahh.. meskipun dunia kuantum di dalamnya penuh dengan ketidakpastian, tapi aku suka banget dengan Albert Einstein ungkapkan kalo Tuhan itu tidak sedang bermain dadu seperti yang ada di <a href="https://youtu.be/m0bCEYXcMF8?si=KD_3b02KaG0Tubck" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">video</a> ini (btw guyss, video ini menarik banget buat kalian yang suka fisika kuantum. langsung kunjungi saja videonya). Dan dari prinsip Einstein ini, aku jadi merasa terdorong ke kehidupan juga. Next ke chapter berikutnya teman-teman😉✨.  </p>
                        `
                    }
                ]
            },
            {
                id: 'chapter-2',
                title: 'Bagian 2',
                subchapters: [
                    {
                        id: 'fisika-kuantum',
                        title: 'Fisika Kuantum dan Kaitannya Dengan Bioteknologi',
                        content: `
                            <p className="mb-6">Dari cerita sebelumnya, cuman yaa..langit berkata lain dimana aku memilih dan mungkin juga sudah direncanakan kalo aku harus berada di jurusan Farmasi. Dari nasib yang ketidakjelasan atau ketidakpastian yang sama dengan dunia kuantum ini aku akhirnya dapet jawaban yang jelas terlihat setelah aku duduk di bangku semester 6 ketika mendapatkan mata kuliah bioteknologi. Dengan bioteknologi, aku mendapatkan jawaban kalo langit memilih aku sebagai latar belakang Farmasi sebenarnya ada kesamaan dari aku yang dulu suka sama dunia kuantum. Langit seperti berbisik di kepala aku, “nihh.. Coba pecahin masalah perkuantumannya yang ada di makhluk hidup salah satunya di manusia”. </p>
                            <br>
                            <p className="mb-6">“Kenapa harus bioteknologi?”. Aku gak tau kenapa tiba-tiba banget minat dengan bioteknologi. Di masa-masa aku sedang kuliah, aku sempat mempelajari dunia coding. Mungkin karena aku minat juga dengan bidang Engineering ditambah dengan adanya teknologi semakin berkembang dengan canggih apalagi dengan adanya AI, aku merasa kayak, “Apa salahnya kalo teknologi-teknologi yang pesat ini bisa dicoba bahkan dimanfaatkan dengan baik untuk bidang kesehatan”. Selain itu, sempet terlintas dipikiran aku kayak, “apa yang kita lakukan sama apa yang kita konsumsi sekarang ini semakin kompleks, akan ada masanya obat-obatan konvensional yang diberikan tidak akan bekerja”. Kenapa bisa gitu?. Mungkin teman-teman juga tau, dimana contoh kecilnya kalo diibaratin seperti dalam hal makanan yang dimakan sama zaman orang tua kita dengan kita. Kita tau kalo pada zaman itu orang tua kita sekedar makan kayak sayuran tahu, tempe, dan semacamnya. Tapi beda banget sama di zaman kita dimana makanan itu kayak ada seblak, extra joss, dan lain-lain. Jadi, gak heran kalo penyakit-penyakit yang dialami oleh zaman kita itu aneh-aneh. Dengan semakin anehnya penyakit yang dialami, otomatis obat-obatan konvensional yang kita konsumsi tidak sepenuhnya bisa menyembuhkan kita. Bahkan gak hanya itu aja. Kita di farmasi sekarang ada kurikulum yang membahas tentang pengembangan obat berbasis komputer atau disebut Computer Aided-Drug Design (CADD) yang dimana ini akan sangat membantu banget sehingga selama penelitian menjadi efisien, waktu yang tidak lama, sama mengurangi biaya yang dikeluarkan mahal. Tentunya masih ada kontribusi lainnya dari bioteknologi untuk kesehatan kita. </p>
                            <br>
                            <p className="mb-6">Yang paling menariknya teman-teman, bioteknologi ini memang terkesan seperti baru, tapi mereka-mereka perusahaan-perusahaan raksasa berteknologi canggih seperti Google bahkan Microsoft sendiri sudah mulai melakukan pivot ke bioteknologi untuk kesehatan. Mereka tau meskipun biaya yang dikeluarkan sama mereka itu adalah besar, bahkan dengan teknologi yang super canggihnya dari mereka, tapi mereka yakin bahwa kedepannya di kesehatan atau di bidang medis ini nantinya akan sangat dibutuhkan. Kedepannya juga mungkin dari segi investasi, bioteknologi bakal jadi menarik para investor buat berinvestasi di bioteknologi seperti yang ada di <a href="https://youtu.be/mB171ropLQs?si=YWnzET69fo5POsy4" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">video</a> ini. </p>
                            <br>
                            <p className="mb-6">Jadi, dari yang aku ceritakan semuanya itu, apakah teman-teman ada yang tertarik juga dan ingin berkontribusi bareng dengan dunia bioteknologi? Yukk.. kalo ada kesempatan, kita kolaborasi bareng biar dunia bioteknologi untuk kesehatan semakin berkembang khususnya di indonesia ☺️. </p>
                            <br>
                        `
                    }
                ]
            }
        ]
    },
    {
        id: 1,
        type: 'structured',
        category: 'Tuberkulosis',
        title: 'Prediksi Dan Pengembangan Vaksin Terbaru Untuk Tuberkulosis',
        author: 'Muhammad Fikri Nabawi',
        date: 'March 10, 2026',
        description: 'Vaksin saat ini yang masih sering digunakan untuk mencegah tuberkulosis adalah BCG, namun vaksin ini memiliki efektivitas yang terbatas dalam mencegah bakteri TB. Tapi dengan perkembangan ilmu pengetahuan dan teknologi yang kian berkembang, kini ada vaksin baru yang lebih efektif untuk mencegah tuberkulosis salah satunya adalah HspX. Untuk mengetahui bagaimana cara kerja vaksin HspX dalam mencegah tuberkulosis termasuk bagaimana cara pengembangan vaksinnya, yuk simak artikelnya.',
        imageAlt: 'Comic cover for Tuberculosis: shadowy lungs with microscopic glowing bacteria',
        color: 'rose',
        coverImage: '/images/tb_bacteria.png',
        content: '',
        articleChapters: [
            {
                id: 'chapter-1',
                title: 'Pendahuluan',
                subchapters: [
                    {
                        id: 'intro',
                        title: 'Pendahuluan',
                        content: `
                            <p className="mb-6">Disclaimer, aku nulis ini hanya apa yang ada di pikiranku saja, dan tentunya apa yang sudah diajarkan di bangku saat aku kuliah oleh dosen-dosen, aku simpulkan berdasarkan pandangan aku saja. Jadi apabila ada penulisan yang dirasa kurang, aku selalu membuka ruang diskusi untuk mendiskusikan secara bersama-sama terkait pembahasan yang dibahas.</p>
                           <br>    
                           <p className="mb-6">Di Indonesia, penyakit yang sering ditemukan dan yang paling banyak adalah Tuberkulosis (TB) yang disebabkan oleh bakteri Mycobacterium tuberculosis (Mtb). Secara klinis bakteri ini biasa menyerang bagian paru-paru. Tapi jika tidak segera ditangani, bakteri ini juga dapat menyerang ke bagian organ lain untuk memperbanyak dirinya seperti ke bagian kelenjar limfa, tulang, dan lain-lain.</p>
                           <br>
                           <p className="mb-6">Cara mengatasi penyebaran infeksi dari bakteri TB, sampai saat ini tenaga kesehatan ngerekomendasiin Obat Anti Tuberkulosis (OAT) dan OAT ini menjadi pilihan terbaik sebagai terapi yang sangat memungkinkan obat tersebut dapat bekerja secara maksimal. Tapi terkadang harapan tidak selalu berjalan sesuai kehendak kita. Meskipun pasien udah dikasih OAT sebagai pilihan terbaik, ada kasus pasien tersebut masih terinfeksi oleh bakteri TB. Yang paling sering terjadi adalah pasiennya tidak patuh dengan alasan waktu konsumsi yang tidak teratur, obatnya kebanyakan, dan lain sebagainya yang menyebabkan malas untuk mengkonsumsi di kemudian harinya. Kemungkinan terburuk yang terjadi, bakteri tersebut akan merevolusi kan bentuknya sehingga bakteri tersebut dapat bertahan terhadap OAT yang dapat membunuhnya. Bahkan bakteri yang masih tetap hidup di dalam tubuh pasien yang terinfeksi karena OAT sudah tidak mampu membunuhnya lagi, bakteri tersebut dapat memiliki kebebasan untuk memperbanyak dirinya lagi dan menginfeksi lebih luas lagi ke organ tubuh di luar paru-paru kita.</p>
                           <br>
                           <p className="mb-6">Okei.. kita tau sekarang di OAT agar lebih efektif, obat dibikin 1 bentuk dengan kandungannya berbagai jenis OAT atau bisa juga mengganti jenis OAT lain. Tapi balik lagi, apakah obat tersebut bekerja ke pasien tersebut? Belum lagi mempertimbangkan ke efek sampingnya, dan masih banyak lagi.</p>
                           <br>
                           <p className="mb-6">Karena adanya masalah tersebut, gimana kalo kita berhipotesis gini:
                           <br>
                           1. OAT termasuk obat antibiotik dimana kerja obat ini untuk "membunuh" bakteri yaitu TB yang menginfeksi ke tubuh kita tanpa obat tersebut berpengaruh ke tubuh kita atau disebut toksisitas selektif. Tapi meskipun toksisitas selektif, apa yang menyebabkan obat tersebut bisa ada efek samping ke tubuh kita? 
                          <br>
                           2. Kalo misalkan kita anggap OAT yang merupakan obat antibiotik tersebut meskipun ada efek sampingnya tapi sangat ampuh daripada obat lainnya dan tentunya dokter atau tenaga kesehatan lainnya juga gak bakal tinggal diam kalo pasiennya ada kendala selama masa terapinya (contohnya sekarang ada gerakan farmakovigilans), mungkin balik lagi apakah pasien tersebut bisa patuh sama disiplin buat ngejalanin OAT tersebut selama 6 bulan?  
                            <br>
                            3. Kalo ada pasien yang gak mau ribet kayak gitu, apakah ada cara pemberian yang lain? 
                           <br>
                           </p>
                           <br>
                           <p className="mb-6">Dari hipotesis-hipotesis di atas, apakah ada yang relate juga? atau mau ada tambahan hipotesis lainnya? tulis aja di kolom komentar yaa.. 💖</p>
                           `,
                        subchapters: [
                            {
                                id: 'intro-sub-1',
                                title: 'Latar Belakang',
                                content: '<p>Detail latar belakang mengenai prevalensi TB di Indonesia.</p>'
                            },
                            {
                                id: 'intro-sub-2',
                                title: 'Tujuan & Hipotesis',
                                content: '<p>Penjelasan lebih lanjut dari hipotesis mengenai pengobatan OAT.</p>'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'chapter-2',
                title: 'Tuberkulosis',
                subchapters: [
                    {
                        id: 'tb-intro',
                        title: 'Pendahuluan',
                        content: ``,
                        subchapters: [
                            {
                                id: 'tb-sub-1',
                                title: 'Pengenalan Tuberkulosis',
                                content: '<p>Teks pendahuluan mengenai apa itu Tuberkulosis dan bagaimana penyebarannya.</p>'
                            },
                            {
                                id: 'tb-sub-2',
                                title: 'Sejarah Penemuan',
                                content: '<p>Sejarah awal penemuan bakteri penyebab Tuberkulosis.</p>'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        category: 'TBA',
        title: 'Coming Soon',
        description: 'New interactive educational content is currently in development. Check back later!',
        imageAlt: 'Coming Soon placeholder with ambient lighting',
        color: 'teal',
        content: `
            <div class="flex items-center justify-center h-full">
                <h2 class="text-3xl font-bold text-white/50">Article in development.</h2>
            </div>
        `
    },
    {
        id: 3,
        category: 'TBA',
        title: 'Coming Soon',
        description: 'New interactive educational content is currently in development. Check back later!',
        imageAlt: 'Coming Soon placeholder with ambient lighting',
        color: 'magenta',
        content: `
            <div class="flex items-center justify-center h-full">
                <h2 class="text-3xl font-bold text-white/50">Article in development.</h2>
            </div>
        `
    }
];
