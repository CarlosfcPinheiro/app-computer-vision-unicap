"""
Configurações da aplicação baseadas em variáveis de ambiente.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Carregar variáveis de ambiente do arquivo .env
env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


class Settings:
    """Configurações da aplicação"""
    
    # Hugging Face
    HF_API_TOKEN: str = os.getenv("HF_API_TOKEN", "")
    HF_MODEL_NAME: str = os.getenv("HF_MODEL_NAME", "ibombonato/swin-age-classifier")
    
    # API
    API_TITLE: str = "Computer Vision API"
    API_DESCRIPTION: str = "API para classificação de imagens usando Hugging Face"
    API_VERSION: str = "1.0.0"
    
    # CORS
    CORS_ORIGINS: list = ["*"]
    
    @classmethod
    def validate(cls) -> None:
        """Valida as configurações necessárias"""
        if not cls.HF_API_TOKEN:
            raise ValueError(
                "HF_API_TOKEN não está configurado. "
                "Configure a variável de ambiente HF_API_TOKEN."
            )


settings = Settings()
