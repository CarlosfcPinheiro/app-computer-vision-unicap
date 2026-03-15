import React from "react";

export default function Home() {

  const irParaPaginaDeUpload = () => {
    console.log("Ir para página de descobrir idade");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0d1a] via-[#12122a] to-[#0b0d1a] text-white flex flex-col items-center justify-between">

      <header className="pt-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-yellow-300">
          Astolfo, o Oráculo do Tempo
        </h1>
      </header>

      <main className="flex flex-col md:flex-row items-center justify-center gap-16 px-6 py-10 w-full max-w-6xl">

        <div className="flex justify-center">
          <img
            src="/foto_do_mago_sem_fundo.png"
            alt="Astolfo o Oráculo"
            className="w-72 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          />
        </div>

        <div className="bg-[#0e0e20]/80 border border-purple-500/40 backdrop-blur-md rounded-2xl p-10 shadow-[0_0_40px_rgba(168,85,247,0.3)] w-full max-w-md text-center">

          <p className="text-gray-300 mb-8">
            O oráculo pode revelar um segredo escondido no tempo.
            Clique no botão abaixo e descubra o que as estrelas dizem sobre você.
          </p>

          <button
            onClick={irParaPaginaDeUpload}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-400 hover:brightness-110 text-yellow-200 font-semibold py-4 rounded-xl shadow-lg transition"
          >
            <span className="text-2xl">👁</span>
            Verifique sua idade
          </button>

        </div>

      </main>

      <footer className="pb-8 text-gray-400 text-sm text-center">
        O destino está escrito nas estrelas e nos seus pixels.
      </footer>

    </div>
  );
}
