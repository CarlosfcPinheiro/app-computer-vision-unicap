from pydantic import BaseModel, Field
from typing import List


class PredictionResponse(BaseModel):
    """Modelo de resposta para uma predição individual"""
    label: str = Field(..., description="Classe/label predito (X-Y)")
    score: float = Field(..., description="Confiança da predição (0-1)")


class ClassificationResponse(BaseModel):
    """Modelo de resposta para classificação de imagem"""
    success: bool = Field(..., description="Indica se a classificação foi bem-sucedida")
    predictions: List[PredictionResponse] = Field(
        ..., 
        description="Lista de predições ordenadas por confiança (maior primeiro)"
    )
    model: str = Field(..., description="Nome do modelo utilizado")
    message: str = Field(default="", description="Mensagem adicional ou mensagem de erro")