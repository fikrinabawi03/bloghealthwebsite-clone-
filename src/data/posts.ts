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
