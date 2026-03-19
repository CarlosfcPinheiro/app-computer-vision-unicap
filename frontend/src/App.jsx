import React, { useState, useEffect } from "react";
import Upload from "./Upload";

import "./App.css";

export default function Home() {
  const [pagina, setPagina] = useState("home");
  const textoCompleto = "Astolfo, o guardião da idade";
  const [textoDigitado, setTextoDigitado] = useState("");

  useEffect(() => {
    let text = 0;

    const intervalo = setInterval(() => {
      setTextoDigitado(textoCompleto.slice(0, text + 1));
      text++

      if (text == textoCompleto.length){
        clearInterval(intervalo);
      }
    }, 50);
    return () => clearInterval(intervalo);
  }, []);

  if (pagina === "upload") {
    return <Upload voltar={() => setPagina("home")} />;
  }

  const irParaPaginaDeUpload = () => {
    setPagina("upload");
  };

  return (
    <div className="containerPrincipal">

      <header>
        <h1 className="titulo">
          {textoDigitado}
        </h1>
      </header>

      <main>

        <img
          src="/Foto do Guardião da Idade.png"
          alt="Astolfo o Guardião da idade"
          className="imagemGuardiao"
        />

        <p className="descricao">
          O guardião da idade pode revelar um segredo escondido no tempo.
          Clique no botão abaixo e descubra o que o algoritmo diz sobre você.
        </p>

        <button
          onClick={irParaPaginaDeUpload}
          className="botaoVerificar"
        >
          Verifique sua idade
        </button>

      </main>

      <footer>
        <p className="rodape">
          A sua idade está escondida nos seus pixels.
        </p>
      </footer>

    </div>
  );
}