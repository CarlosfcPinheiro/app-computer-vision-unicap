# App de Visão Computacional - UNICAP

Aplicação web para classificação de faixas etárias através de análise de imagens usando modelos de deep learning.

## 📋 Sobre o Projeto

Sistema completo de visão computacional que utiliza inteligência artificial para estimar faixas etárias a partir de imagens. A aplicação é composta por um backend em Python com FastAPI e um frontend em React, integrados com a API do Hugging Face.

## 🎯 Caso de Uso

Inspirado no conceito do **Akinator**, o famoso gênio da web que adivinha personagens através de perguntas, este projeto implementa uma abordagem similar aplicada à identificação de faixas etárias. 

Enquanto o Akinator usa perguntas para deduzir informações, nosso **"Guardião da Idade"** (Astolfo) utiliza visão computacional e deep learning para analisar imagens de pessoas e estimar suas faixas etárias. O modelo treinado consegue identificar características faciais e padrões que indicam diferentes grupos etários, oferecendo predições com níveis de confiança.

## 📙 Integrantes do Grupo
- Carlos Fábio Cabral Pinheiro
- Giovanna Priscilla da Silva Lima
- Arthur Gonçalves Figuerôa
- Italo Cézar de Aquino Verçoza

## 🏗️ Arquitetura

```
app-computer-vision/
├── backend/          # API FastAPI + Hugging Face
├── frontend/         # Interface React + Vite
└── README.md         # Este arquivo
```

## 🚀 Tecnologias Principais

### Backend
- FastAPI
- Hugging Face Inference API
- Python 3.12+

### Frontend
- React 19
- Vite 8
- Fetch API

## ⚡ Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
# Configure o arquivo .env com seu token do Hugging Face
fastapi dev
```

Acesse: http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

## 📖 Documentação Detalhada

Cada módulo possui sua própria documentação:

- **Backend**: [backend/README.md](backend/README.md)
- **Frontend**: [frontend/README.md](frontend/README.md)

## 🔑 Requisitos

- Python 3.12+
- Node.js 18+
- Token da API do Hugging Face

## 🤝 Contribuindo

Este é um projeto acadêmico da UNICAP. Para contribuições, consulte a documentação específica de cada módulo.

## 📄 Licença

Projeto desenvolvido para fins educacionais.
