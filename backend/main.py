from fastapi import FastAPI

import api
from dictionary import Dictionary
from question import Question
from question_service import question_service
from question_type import QuestionType
from tone_hanzi_question_generator import ToneHanziQuestionGenerator
from trainer import Trainer


dictionaries = [
    # "словарь2.csv",
    # "местоимения.csv",
    # "основные глаголы.csv",
    # "времена года.csv",
    "погода.csv"
]

dictionary = Dictionary()

for d in dictionaries:
    dictionary.load(d)

# train = Trainer(dictionary)
# train.run_trainer()

words_list = dictionary.get_words_list()
word = words_list[0]
question = Question(
    type=QuestionType.TONE_HANZI,
    text=f"Какие номера тонов у слова {word.hanzi} ({word.pinyin} - {", ".join(word.translations)})?: ",
    answers=[str(word.tone)],
    mistake_details=f"Это тон {word.tone}"
)

question_service.add_question(question)

app = FastAPI()
app.include_router(api.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)