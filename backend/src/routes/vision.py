import logging
import requests
from fastapi import APIRouter, UploadFile, File, HTTPException

from ..config import settings
from ..schemas import PredictionResponse, ClassificationResponse

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/vision", tags=["vision"])

@router.post("/classify", response_model=ClassificationResponse)
async def classify_image(
    file: UploadFile = File(..., description="Imagem para classificação")
):
    """
    Classifica uma imagem usando o modelo de visão do Hugging Face
    
    Args:
        file: Arquivo de imagem (JPEG, PNG, etc.)
        
    Returns:
        ClassificationResponse com as predições por ordem de confiança
    """
    try:
        # Lê os dados da imagem
        image_data = await file.read()
        
        if not image_data:
            raise HTTPException(status_code=400, detail="Image file is empty")
        
        # Configura a chamada à API do Hugging Face
        api_url = f"https://router.huggingface.co/hf-inference/models/{settings.HF_MODEL_NAME}"
        headers = {
            "Authorization": f"Bearer {settings.HF_API_TOKEN}",
            "Content-Type": file.content_type or "image/jpeg"
        }
        
        # Envia os bytes da imagem diretamente com content-type definido
        response = requests.post(api_url, headers=headers, data=image_data)
        response.raise_for_status()
        
        # Obtém as predições
        predictions = response.json()
        
        # Converte para o formato de resposta
        prediction_list = [
            PredictionResponse(
                label=pred.get("label", "unknown"),
                score=float(pred.get("score", 0))
            )
            for pred in predictions
        ]
        
        return ClassificationResponse(
            success=True,
            predictions=prediction_list,
            model=settings.HF_MODEL_NAME,
            message="Image classified successfully"
        )
        
    except HTTPException:
        raise
    except requests.exceptions.HTTPError as e:
        status_code = e.response.status_code
        error_detail = e.response.text if e.response.text else str(e)
        
        logger.error(f"Hugging Face API error {status_code}: {error_detail}")
        
        # Mensagens específicas para alguns códigos
        if status_code == 503:
            detail = "Model is currently loading. Please try again in a few moments."
        else:
            detail = f"API error ({status_code}): {error_detail}"
        
        raise HTTPException(status_code=status_code, detail=detail)
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        raise HTTPException(
            status_code=503,
            detail="Unable to connect to Hugging Face API"
        )
        
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )