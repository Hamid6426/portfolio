import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-full max-h-screen">
      <section className="w-1/2 absolute top-0 left-0 h-full z-5">
        {/* <div className="text-white text-3xl z-5">Hamid afmdspadsmngfkmdsalkmn lkganlksn flgkasnlkgnfklasnlgnalkdsnlgkdnlkanglkdnlkglknadlkngldanlkgndlksanlka</div> */}
      </section>

      {/* ─ DESKTOP WAVE ─ */}
      <section className="hidden sm:block absolute top-0 right-0 w-full h-full bg-[#001] overflow-hidden">
        <svg viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out delay-150">
          <defs>
            <linearGradient id="gradient-desktop" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="5%" stopColor="#000011" />
              <stop offset="95%" stopColor="#330066" />
            </linearGradient>
          </defs>
          <path d="M 0,500 L 0,262 C 128,276.339 … 1440,37 L 1440,500 L 0,500 Z" fill="url(#gradient-desktop)" fillOpacity="1" className="wave-desktop" />
        </svg>
      </section>

      {/* ─ MOBILE WAVE ─ */}
      <section className="sm:hidden block overflow-hidden absolute top-0 left-0 w-screen h-screen bg-[#001]">
        <svg viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute transition inset-0 h-full w-full duration-300 ease-in-out delay-150 rotate-90">
          <defs>
            <linearGradient id="gradient-mobile" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="5%" stopColor="#000011" />
              <stop offset="95%" stopColor="#330066" />
            </linearGradient>
          </defs>
          <path d="M 0,600 L 0,300 C 88.893 … 1440,600 L 0,600 Z" fill="url(#gradient-mobile)" fillOpacity="1" className="wave-mobile" />
        </svg>
      </section>
    </main>
  );
}
