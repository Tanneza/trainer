class Question:
    def __init__(self, text: str, answers: list[str], mistake_details: str):
        self._text = text
        self._answers = answers
        self._mistake_details = mistake_details


    def get_text(self) -> str:
        return self._text


    def check(self, user_answer) -> bool:
        return user_answer in self._answers

    def get_mistake_details(self) -> str:
        return self._mistake_details