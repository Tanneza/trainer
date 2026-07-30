from generators.question_generator import QuestionGenerator
from models.question_type import QuestionType
from models.question import Question
from models.radicals_dictionary import RadicalsDictionary
from services.question_service import question_service


class RadicalNumberHanziQuestionGenerator(QuestionGenerator):
    def __init__(self, radicals_dictionary: RadicalsDictionary):
        self._radicals_dictionary = radicals_dictionary


    def generate(self) -> list[Question]:
        questions_list = []

        for word in self._radicals_dictionary.get_radicals_list():
            question_type = QuestionType.TONE_HANZI
            existing_question = question_service.get_question_by_type_and_word_id(question_type, word.word_id)
            if existing_question:
                question = existing_question
            else:
                html_template = question_service.get_question_template_by_type(question_type)
                question = Question(
                    question_type=question_type,
                    word_id=word.word_id,
                    html=html_template.format(hanzi=word.hanzi, pinyin=word.pinyin, translations=", ".join(word.translations)),
                    answers=[str(word.number)],
                    mistake_details=f"Номер этого ключа {word.number}"
                )
                question_service.add_question(question)

            questions_list.append(question)
            
        return questions_list