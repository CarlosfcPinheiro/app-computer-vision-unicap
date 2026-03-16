# Backend - API de Visão Computacional

API FastAPI integrada com Hugging Face para classificação de imagens usando modelos de deep learning.

## 📁 Estrutura do Projeto

```
src/
├── app.py                 # Aplicação principal FastAPI
├── main.py                # Entry point para produção
├── __init__.py
├── config/
│   ├── __init__.py
│   └── settings.py        # Configurações e variáveis de ambiente
├── routes/
│   ├── __init__.py
│   ├── base.py            # Rotas básicas da API
│   └── vision.py          # Endpoints de visão computacional
└── schemas/
    ├── __init__.py
    └── classification.py  # Modelos Pydantic para validação de dados
```

## 🚀 Tecnologias

- **FastAPI**: Framework web moderno e rápido
- **Uvicorn**: Servidor ASGI assíncrono
- **Pydantic**: Validação de dados com type hints
- **Requests**: Cliente HTTP para comunicação com Hugging Face API
- **Python-dotenv**: Gerenciamento de variáveis de ambiente

## 🔧 Componentes Principais

### Routes (src/routes/)

**base.py** - Rotas básicas
- `GET /`: Endpoint de boas-vindas

**vision.py** - Endpoints de visão
- `POST /vision/classify`: Classifica uma imagem

### Schemas (src/schemas/)

**classification.py** - Modelos de dados
- `PredictionResponse`: Estrutura de uma predição individual
- `ClassificationResponse`: Resposta completa da classificação

## 🛠️ Configuração e Execução Local

### Pré-requisitos

- Python 3.12 ou superior
- pip (gerenciador de pacotes Python)
- Conta Hugging Face (para obter API token)

### Passo a Passo

#### 1. Clone o repositório e navegue até o backend

```bash
cd backend
```

#### 2. Crie um ambiente virtual (recomendado)

```bash
python -m venv .venv
source .venv/bin/activate  # No Windows: .venv\Scripts\activate
```

#### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

#### 4. Configure as variáveis de ambiente

Copie o arquivo de exemplo e configure seu token:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione seu token do Hugging Face:

```env
HF_API_TOKEN=seu_token_aqui
HF_MODEL_NAME=ibombonato/swin-age-classifier
```

> **Nota**: Obtenha seu token em https://huggingface.co/settings/tokens

#### 5. Execute o servidor de desenvolvimento

```bash
fastapi dev
# ou
python main.py
# ou
python -m uvicorn main:app --reload
```

O servidor estará disponível em:
- **API**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

#### 6. Teste a API

Acesse http://localhost:8000/docs e teste o endpoint `/vision/classify` enviando uma imagem.

## 🐋 Execução com Docker

```bash
# Construir a imagem
docker build -t computer-vision-api ./backend

# Executar o container
docker run -d \
  -p 8000:8000 \
  -e HF_API_TOKEN=seu_token_aqui \
  -e HF_MODEL_NAME=ibombonato/swin-age-classifier \
  --name vision-api \
  computer-vision-api

# Ver logs
docker logs -f vision-api

# Parar e remover
docker stop vision-api && docker rm vision-api
```

## 📚 API Endpoints

### Classificar Imagem

```http
POST /vision/classify HTTP/1.1
Content-Type: multipart/form-data

[arquivo de imagem]
```

**Response:**
```json
{
  "success": true,
  "predictions": [
    {
      "label": "20-30",
      "score": 0.6079689860343933
    },
    {
      "label": "10-20",
      "score": 0.33915698528289795
    },
    {
      "label": "80-90",
      "score": 0.01191805675625801
    }
  ],
  "model": "ibombonato/swin-age-classifier",
  "message": "Image classified successfully"
}
```

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `HF_API_TOKEN` | Token de autenticação Hugging Face | Vazio (obrigatório) |
| `HF_MODEL_NAME` | Nome do modelo de classificação | `ibombonato/swin-age-classifier` |

## 🚨 Error Handling

A API retorna erros estruturados:

- **400**: Requisição inválida (arquivo vazio)
- **503**: Erro ao comunicar com Hugging Face (modelo carregando ou indisponível)
- **500**: Erro interno do servidor

## 🔄 Fluxo de Execução

1. Cliente envia imagem para `/vision/classify`
2. FastAPI valida o arquivo recebido
3. Imagem é enviada para a API do Hugging Face via requests
4. Resultados são retornados já ordenados por confiança
5. Resposta formatada é retornada ao cliente

## 📚 Referências

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index)
- [Modelo Swin Age Classifier](https://huggingface.co/ibombonato/swin-age-classifier)