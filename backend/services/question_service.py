from models.question import Question
from models.question_type import QuestionType


class QuestionService:
    def __init__(self):
        self.questions: list[Question] = []
        self.question_by_id: dict[int, Question] = {}
        self.question_by_type_and_word_id: dict[QuestionType, dict[int, Question]] = {}
        self.next_id: int = 0
        self.question_templates: dict[QuestionType, str] = {}


    def get_question_template_by_type(self, question_type: QuestionType) -> str:
        if question_type not in self.question_templates:
            with open(f"question_templates/{question_type.value}.html", "r", encoding="utf-8") as file:
                self.question_templates[question_type] = file.read()
        return self.question_templates[question_type]


    def get_question_by_id(self, question_id: int) -> Question:
        return self.question_by_id[question_id]


    def get_question_by_type_and_word_id(self, question_type: QuestionType, word_id: int) -> Question | None:
        questions_by_type = self.question_by_type_and_word_id.get(question_type)
        if not questions_by_type:
            return None
        return questions_by_type.get(word_id)


    def add_question(self, question: Question):
        question_id = question.question_id

        if question_id is None:
            question_id = self.next_id
            question.question_id = question_id
            self.next_id += 1

        self.questions.append(question)

        self.add_question_to_indexes(question)


    def add_question_to_indexes(self, question: Question):
        self.question_by_id[question.question_id] = question

        if question.question_type not in self.question_by_type_and_word_id:
            self.question_by_type_and_word_id[question.question_type] = {}

        self.question_by_type_and_word_id[question.question_type][question.word_id] = question


question_service = QuestionService()