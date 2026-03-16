import React, { useState } from "react";

export default function Upload({ voltar }) {

  const [idade, setIdade] = useState(null);

  const descobrirIdade = async () => {

    const resposta = await fetch("http://localhost:5000/predict");

    const dados = await resposta.json();

    setIdade(dados.idade);

  };

  return (
    <div className="uploadContainer">

      <div className="uploadCard">

        <h2 className="uploadTitulo">
          Envie sua foto
        </h2>

        <input type="file" className="inputImagem" />

        <button
          onClick={descobrirIdade}
          className="botaoDescobrir"
        >
          Descobrir idade
        </button>

        {idade && (
          <p className="uploadTexto">
            Astolfo acredita que você tem <b>{idade}</b> anos.
          </p>
        )}

        <button
          onClick={voltar}
          className="botaoVoltar"
        >
          Voltar
        </button>

      </div>

    </div>
  );
}