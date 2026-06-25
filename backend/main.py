from fastapi import FastAPI

import api
from dictionary import Dictionary
from question import Question
from question_service import question_service
from question_type import QuestionType
from tone_hanzi_question_generator import ToneHanziQuestionGenerator
from trainer import Trainer


# train = Trainer(dictionary)
# train.run_trainer()


app = FastAPI()
app.include_router(api.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)