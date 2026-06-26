from models.dictionary import Dictionary
from models.question import Question
from generators.question_generator import QuestionGenerator
from services.question_service import question_service
from models.question_type import QuestionType


class ToneHanziQuestionGenerator(QuestionGenerator):
    def __init__(self, dictionary: Dictionary):
        self._dictionary = dictionary

    def generate(self) -> list[Question]:
        questions_list = []

        for word in self._dictionary.get_words_list():
            question_type=QuestionType.TONE_HANZI
            html_template = question_service.get_question_template_by_type(question_type)
            question = Question(
                question_type=question_type,
                html=html_template.format(hanzi=word.hanzi, pinyin=word.pinyin, translations=", ".join(word.translations)),
                answers=[str(word.tone)],
                mistake_details=f"Это тон {word.tone}"
            )

            questions_list.append(question)

        return questions_list


