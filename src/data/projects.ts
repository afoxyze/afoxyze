import TanyaKerjaImg from "../assets/TanyaKerja.png";
import ProyekBagusImg from "../assets/ProyekBagusPemerintah.png";
import MbgImg from "../assets/MBG.png";

export const PROJECTS = [
  {
    n: "01",
    kicker: "Legal · AI",
    title: "TanyaKerja",
    desc: "Tanya peraturan ketenagakerjaan Indonesia — kontrak, PHK, pesangon, lembur — dijawab berbasis pasal.",
    url: "https://tanyakerja.afoxyze.dev",
    domain: "tanyakerja.afoxyze.dev",
    glyph: "T",
    year: "2025",
    stack: "Next · LLM · pasal.id",
    status: "Live",
    image: TanyaKerjaImg.src
  },
  {
    n: "02",
    kicker: "OSINT · Investigation",
    title: "Proyek \"Bagus\" Pemerintah",
    desc: "Kumpulan Informasi Proyek \"Bagus\" Pemerintah dan Relasi ditiap Proyek \"Bagusnya\"",
    url: "https://proyekbagus.afoxyze.dev",
    domain: "proyekbagus.afoxyze.dev",
    glyph: "K",
    year: "2025",
    stack: "Next · Graph · OSINT",
    status: "Live",
    image: ProyekBagusImg.src
  },
  {
    n: "03",
    kicker: "Public budget · Live",
    title: "Biaya MBG",
    desc: "Ticker anggaran Makan Bergizi Gratis — biaya program, real-time, dalam angka publik.",
    url: "https://mbg.afoxyze.dev",
    domain: "mbg.afoxyze.dev",
    glyph: "R",
    year: "2025",
    stack: "Next · Realtime",
    status: "Live",
    image: MbgImg.src
  }
];