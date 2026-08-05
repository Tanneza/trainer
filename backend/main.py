from fastapi import FastAPI

from api import lessons, questions, phrase_of_day

app = FastAPI()
app.include_router(lessons.router)
app.include_router(questions.router)
app.include_router(phrase_of_day.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)