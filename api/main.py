"""FastAPI server templat"""
from contextlib import asynccontextmanager

from fastapi import FastAPI
# from routers import items  # Importing your routers
from fastapi.middleware.cors import CORSMiddleware
from modules.some_script.some_script import some_script


# This function will run when the server starts
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Life span run"""
    # Code to run on startup
    result= some_script('FastAPI')
    print(f"Some script is runing {result}")
    yield

    # Code to run on shutdown
    print("Server is shutting down...")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():
    """Main rout the app"""

    return {
        "title": "Python template 🚀",
        "message": "This message from FastAPI server"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
