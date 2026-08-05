from generators.question_generator import QuestionGenerator
from models.numeral_dictionary import NumeralDictionary
from models.question import Question
from models.question_type import QuestionType
from services.question_service import question_service


class NumeralTranslationPinyinQuestionGenerator(QuestionGenerator):
    def __init__(self, numeral_dictionary: NumeralDictionary):
        self._numeral_dictionary = numeral_dictionary

    def generate(self) -> list[Question]:
        questions_list = []

        for word in self._numeral_dictionary.get_numerals_list():
            question_type = QuestionType.NUMERAL_TRANSLATION_PINYIN
            existing_question = question_service.get_question_by_type_and_word_id(question_type, word.word_id)
            if existing_question:
                question = existing_question
            else:
                html_template = question_service.get_question_template_by_type(question_type)
                question = Question(
                    question_type=question_type,
                    word_id=word.word_id,
                    html=html_template.format(pinyin=word.pinyin, hanzi=word.hanzi),
                    answers=[word.translation],
                    mistake_details=f"Перевод пиньинь данной цифры - {word.translation}"
                )
                question_service.add_question(question)

            questions_list.append(question)

        return  questions_list