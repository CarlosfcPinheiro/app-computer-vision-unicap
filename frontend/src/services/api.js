import { API_BASE_URL } from '../constants/api';

export const visionService = {
  /**
   * Classifica uma imagem enviando para o backend
   * @param {File} imageFile - Arquivo de imagem a ser classificado
   * @returns {Promise<Object>} Resposta contendo as predições de faixas etárias
   * @throws {Error} Erro com mensagem descritiva caso a requisição falhe
   */
  async classificarImagem(imageFile) {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch(`${API_BASE_URL}/vision/classify`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || 
          `Erro ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.success || !data.predictions) {
        throw new Error('Resposta inválida do servidor');
      }

      return data;

    } catch (error) {
      // Re-lança erro de rede ou parsing
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao processar a imagem. Tente novamente.');
    }
  }
};

export const formatUtils = {
  /**
   * Formata um score decimal como porcentagem
   * @param {number} score - Score entre 0 e 1
   * @returns {string} Porcentagem formatada (ex: "85.3%")
   */
  formatarPorcentagem(score) {
    return (score * 100).toFixed(1) + '%';
  }
};
