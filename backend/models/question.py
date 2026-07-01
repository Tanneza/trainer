from models.question_type import QuestionType


class Question:
    def __init__(self, html: str, answers: list[str], mistake_details: str, question_type: QuestionType, word_id: int):
        self.html = html
        self.answers = answers
        self.mistake_details = mistake_details
        self.question_type = question_type
        self.word_id = word_id
        self.question_id: int | None = None


    def check(self, user_answer) -> bool:
        return user_answer in self.answers