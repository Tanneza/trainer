from models.dictionary import Dictionary
from models.question import Question
from services.question_service import question_service
from generators.question_generator import QuestionGenerator
from models.question_type import QuestionType


class TranslationPinyinQuestionGenerator(QuestionGenerator):
    def __init__(self, dictionary: Dictionary):
        self._dictionary = dictionary

    def generate(self) -> list[Question]:
        question_list = []
        for word in self._dictionary.get_words_list():
            question_type = QuestionType.TRANSLATION_PINYIN
            existing_question = question_service.get_question_by_type_and_word_id(question_type, word.word_id)
            if existing_question:
                question = existing_question
            else:
                html_template = question_service.get_question_template_by_type(question_type)
                if len(word.translations) == 1:
                    mistake_details = f"Перевод слова: {word.translations[0]}"
                else:
                    mistake_details = f"Варианты перевода слова: {", ".join(word.translations)}"
                question = Question(
                    question_type=question_type,
                    word_id=word.word_id,
                    html=html_template.format(pinyin=word.pinyin, hanzi=word.hanzi),
                    answers=word.translations,
                    mistake_details=mistake_details
                )
                question_service.add_question(question)

            question_list.append(question)

        return question_list