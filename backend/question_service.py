from question import Question


class QuestionService:
    def __init__(self):
        self.questions: dict[int, Question] = {}
        self.next_id: int = 0


    def get_question_by_id(self, question_id: int) -> Question:
        return self.questions[question_id]

    def add_question(self, question: Question):
        self.questions[self.next_id] = question
        self.next_id += 1


question_service = QuestionService()