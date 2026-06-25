from question import Question
from question_type import QuestionType


class QuestionService:
    def __init__(self):
        self.questions: dict[int, Question] = {}
        self.next_id: int = 0
        self.question_templates: dict[QuestionType, str] = {}


    def get_question_template_by_type(self, question_type: QuestionType) -> str:
        if question_type not in self.question_templates:
            with open(f"question_templates/{question_type.value}.html", "r", encoding="utf-8") as file:
                self.question_templates[question_type] = file.read()
        return self.question_templates[question_type]


    def get_question_by_id(self, question_id: int) -> Question:
        return self.questions[question_id]

    def add_question(self, question: Question):
        question_id = question.question_id
        if question_id is None:
            question_id = self.next_id
            question.question_id = question_id
            self.next_id += 1
        self.questions[question_id] = question



question_service = QuestionService()