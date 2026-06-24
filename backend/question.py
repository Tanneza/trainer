from question_type import QuestionType


class Question:
    def __init__(self, text: str, answers: list[str], mistake_details: str, type: QuestionType):
        self._text = text
        self._answers = answers
        self._mistake_details = mistake_details
        self._type = type


    def get_type(self) -> QuestionType:
        return self._type


    def get_text(self) -> str:
        return self._text


    def check(self, user_answer) -> bool:
        return user_answer in self._answers

    def get_mistake_details(self) -> str:
        return self._mistake_details