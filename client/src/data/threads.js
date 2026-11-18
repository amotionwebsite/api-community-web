export const INITIAL_THREADS = [
  {
    id: "1",
    title: "Error CORS saat fetch API Express dari Next.js di Vercel",
    category: "Bug & Error",
    author: "rizky_dev",
    time: "12 menit lalu",
    solved: true,
    excerpt:
      "Sudah pasang cors() di server.js tapi pas deploy ke Railway masih kena blokir origin dari domain Vercel...",
    content:
      "Halo sepuh, mau tanya. Aku deploy frontend Next.js di Vercel dan backend Express di Railway. Di lokal aman, tapi pas production muncul error Access-Control-Allow-Origin. Solusinya gimana ya?",
    comments: [
      {
        id: "c1",
        author: "jason_franklin",
        time: "8 menit lalu",
        text: "Pastikan konfigurasi cors-nya eksplisit mengizinkan origin Vercel kamu dan allowedHeaders: ['Content-Type', 'Authorization'].",
      },
    ],
  },
  {
    id: "2",
    title: "Setup Termux + Acode paling ringan buat ngoding fullstack di HP",
    category: "Workflow",
    author: "anak_termux",
    time: "1 jam lalu",
    solved: false,
    excerpt:
      "Sharing konfigurasi storage link, git credential helper, dan shortcut keyboard Acode biar ngoding di Android sat-set.",
    content:
      "Buat teman-teman yang ngoding full dari Android pakai Termux + Acode, jangan lupa jalankan termux-setup-storage dan simpan folder project di direktori yang mudah diakses Acode.",
    comments: [],
  },
  {
    id: "3",
    title: "Mending pakai Zustand atau Context API untuk state auth JWT?",
    category: "Diskusi Tech",
    author: "nadia.tsx",
    time: "3 jam lalu",
    solved: true,
    excerpt:
      "Lagi bikin dashboard multi-role, ragu antara simpan token + profile user di Zustand persist atau cukup React Context.",
    content:
      "Kalau state-nya sering dibaca di banyak komponen (Navbar, Protected Route, Form Post), lebih bersih pakai Zustand dengan middleware persist atau React Context biasa?",
    comments: [],
  },
];
