import React, { useState } from "react";
import { visionService, formatUtils } from "./services/api";

export default function Upload({ voltar }) {

  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultados, setResultados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleSelecionarImagem = (event) => {
    const arquivo = event.target.files[0];
    
    if (arquivo) {
      // Valida se é uma imagem
      if (!arquivo.type.startsWith('image/')) {
        setErro('Por favor, selecione um arquivo de imagem válido');
        return;
      }

      setImagemSelecionada(arquivo);
      setErro(null);
      setResultados(null);

      // Cria URL de preview
      const url = URL.createObjectURL(arquivo);
      setPreviewUrl(url);
    }
  };

  const descobrirIdade = async () => {
    if (!imagemSelecionada) {
      setErro('Por favor, selecione uma imagem primeiro');
      return;
    }

    setCarregando(true);
    setErro(null);
    setResultados(null);

    try {
      // Usa o service para classificar a imagem
      const dados = await visionService.classificarImagem(imagemSelecionada);
      setResultados(dados.predictions);

    } catch (error) {
      console.error('Erro ao classificar imagem:', error);
      setErro(error.message || 'Erro ao processar a imagem. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="uploadContainer">

      <div className="uploadCard">

        <h2 className="uploadTitulo">
          Envie sua foto
        </h2>

        <input 
          type="file" 
          className="inputImagem"
          accept="image/*"
          onChange={handleSelecionarImagem}
          disabled={carregando}
        />

        {previewUrl && (
          <img 
            src={previewUrl} 
            alt="Preview da imagem selecionada" 
            className="previewImagem"
          />
        )}

        {erro && (
          <p className="uploadTexto" style={{ color: '#ef4444' }}>
            ⚠️ {erro}
          </p>
        )}

        <button
          onClick={descobrirIdade}
          className="botaoDescobrir"
          disabled={carregando || !imagemSelecionada}
          style={{ 
            opacity: (carregando || !imagemSelecionada) ? 0.6 : 1,
            cursor: (carregando || !imagemSelecionada) ? 'not-allowed' : 'pointer'
          }}
        >
          {carregando ? 'Analisando...' : 'Descobrir idade'}
        </button>

        {resultados && resultados.length > 0 && (
          <div className="resultadosContainer">
            <h3 className="uploadTexto" style={{ fontSize: '18px', marginBottom: '10px', color: '#facc15' }}>
              Astolfo revela a faixa etária:
            </h3>
            
            {resultados.map((predicao, index) => (
              <div 
                key={index}
                className="uploadTexto"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  background: index === 0 ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: index === 0 ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <span style={{ fontWeight: index === 0 ? 'bold' : 'normal', fontSize: '16px' }}>
                  {predicao.label} anos
                </span>
                <span style={{ 
                  color: index === 0 ? '#facc15' : '#9ca3af',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  {formatUtils.formatarPorcentagem(predicao.score)}
                </span>
              </div>
            ))}

            <p className="uploadTexto" style={{ marginTop: '16px', fontSize: '14px', color: '#9ca3af' }}>
              {resultados[0] && `Maior probabilidade: ${resultados[0].label} anos`}
            </p>
          </div>
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