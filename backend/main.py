"""
Entry point for the FastAPI application.
This file is used in production to start the server with Gunicorn.

Usage:
  - Development: python -m uvicorn main:app --reload
  - Production: gunicorn main:app
"""

from src.app import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)