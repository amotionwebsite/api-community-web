import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-violet-500 selection:text-white">
      {/* Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="px-2 py-0.5 rounded bg-violet-600 text-white text-sm font-mono">
              &lt;/&gt;
            </span>
            <span>Anak Programmer Indonesia</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link href="/forum" className="hover:text-violet-400 transition">
              Forum
            </Link>
            <Link href="/showcase" className="hover:text-violet-400 transition">
              Showcase
            </Link>
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition"
            >
              Masuk
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section (Portal Utama) */}
      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-medium w-fit mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Komunitas Developer & Tech Enthusiast Indonesia
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5">
          Tempat Ngoding, Diskusi Error, dan{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
            Pamer Karya
          </span>{" "}
          Bareng.
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          Wadah kolaborasi untuk programmer pemula hingga sepuh di Indonesia.
          Tanya jawab seputar bug, bagikan side-project kamu, dan bangun
          jejaring dengan sesama developer.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link
            href="/forum"
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition shadow-lg shadow-violet-600/20"
          >
            Mulai Diskusi di Forum
          </Link>
          <a
            href="#komunitas"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium transition"
          >
            Gabung Grup Discord / WA
          </a>
        </div>

        {/* Kartu Fitur Utama */}
        <div id="komunitas" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-violet-400 font-mono text-sm mb-2">01 // FORUM Q&A</div>
            <h3 className="font-bold text-lg mb-1">Bedah Error & Bug</h3>
            <p className="text-sm text-slate-400">
              Stuck pas ngoding? Posting potongan kode dan error-nya, biar dibantu
              pecahkan bareng member lain.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-fuchsia-400 font-mono text-sm mb-2">02 // SHOWCASE</div>
            <h3 className="font-bold text-lg mb-1">Pamer Side-Project</h3>
            <p className="text-sm text-slate-400">
              Punya web, aplikasi Android, atau bot keren? Pajang di sini buat
              dapet feedback dan portofolio.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-emerald-400 font-mono text-sm mb-2">03 // NETWORKING</div>
            <h3 className="font-bold text-lg mb-1">Grup & Event Rutin</h3>
            <p className="text-sm text-slate-400">
              Terhubung langsung dengan server Discord, grup WhatsApp, dan info
              sharing session komunitas.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        © 2026 Anak Programmer Indonesia. Dibangun dengan Next.js & Node.js.
      </footer>
    </div>
  );
}
