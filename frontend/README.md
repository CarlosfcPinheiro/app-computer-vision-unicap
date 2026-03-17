# Frontend - Interface de Visão Computacional

Interface React moderna para classificação de imagens, integrada com a API de Visão Computacional.

## 📁 Estrutura do Projeto

```
src/
├── main.jsx              # Entry point da aplicação
├── App.jsx               # Componente principal (página inicial)
├── Upload.jsx            # Componente de upload e classificação
├── App.css               # Estilos globais da aplicação
├── index.css             # Estilos base
├── constants/
│   └── api.js            # Configurações de API (URL base)
├── services/
│   └── api.js            # Serviços de comunicação com o backend
└── assets/               # Recursos estáticos (imagens, ícones)
```

## 🚀 Tecnologias

- **React 19**: Library JavaScript para interfaces de usuário
- **Vite 8**: Build tool rápido e moderno
- **React Router DOM**: Roteamento declarativo para React
- **Fetch API**: Cliente HTTP nativo para comunicação com backend
- **CSS moderno**: Estilização com gradientes e animações

## 🔧 Componentes Principais

### Componentes (src/)

**App.jsx** - Página inicial
- Exibição do guardião da idade (Astolfo)
- Navegação para página de upload

**Upload.jsx** - Upload e classificação
- Seleção de imagem com preview
- Envio para API de classificação
- Exibição de resultados com faixas etárias

### Services (src/services/)

**api.js** - Comunicação com backend
- `visionService.classificarImagem()`: Envia imagem para classificação
- `formatUtils.formatarPorcentagem()`: Formatação de resultados

### Constants (src/constants/)

**api.js** - Configurações
- `API_BASE_URL`: URL base da API backend

## 🛠️ Configuração e Execução Local

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn (gerenciador de pacotes)
- Backend da API em execução (porta 8000)

### Passo a Passo

#### 1. Clone o repositório e navegue até o frontend

```bash
cd frontend
```

#### 2. Instale as dependências

```bash
npm install
```

#### 3. Configure a URL da API

Verifique o arquivo `src/constants/api.js` e ajuste se necessário:

```javascript
export const API_BASE_URL = 'http://localhost:8000';
```

#### 4. Execute o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:
- **Frontend**: http://localhost:5173

#### 5. Build para produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

#### 6. Preview da build de produção

```bash
npm run preview
```

## 📦 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com hot reload |
| `npm run build` | Gera build otimizado para produção |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Executa o ESLint para análise de código |

## 🎨 Funcionalidades

### Página Inicial (Home)
- Interface temática com design personalizado
- Apresentação do "Guardião da Idade"
- Botão de acesso à funcionalidade de classificação

### Página de Upload
- **Seleção de imagem**: Escolha arquivos de imagem do dispositivo
- **Preview**: Visualização da imagem antes do envio
- **Classificação**: Envio para API e processamento
- **Resultados**: Exibição de faixas etárias com percentuais de confiança
- **Validação**: Verificação de tipo de arquivo
- **Loading state**: Indicador visual durante processamento
- **Error handling**: Tratamento e exibição de erros

## 🔄 Fluxo de Execução

1. Usuário acessa a página inicial
2. Clica em "Verifique sua idade"
3. Seleciona uma imagem do dispositivo
4. Preview da imagem é exibido
5. Clica em botão para classificar
6. Imagem é enviada para API via FormData
7. Resultados são recebidos e exibidos
8. Possibilidade de classificar nova imagem

## 🚨 Tratamento de Erros

A interface lida com diversos cenários de erro:

- **Arquivo inválido**: Validação de tipo de arquivo de imagem
- **Sem imagem**: Alerta ao tentar classificar sem selecionar imagem
- **Erro de API**: Exibição de mensagens de erro do backend
- **Timeout**: Indicação de problemas de conexão

## 🔗 Integração com Backend

O frontend se comunica com o backend através do endpoint:

```
POST /vision/classify
Content-Type: multipart/form-data
```

Resposta esperada:
```json
{
  "success": true,
  "predictions": [
    {
      "label": "20-30",
      "score": 0.6079689860343933
    }
  ],
  "model": "ibombonato/swin-age-classifier",
  "message": "Image classified successfully"
}
```

## 📚 Referências

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Fetch API - MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
