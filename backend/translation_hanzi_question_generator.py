from dictionary import Dictionary
from question import Question
from question_generator import QuestionGenerator
from question_type import QuestionType


class TranslationHanziQuestionGenerator(QuestionGenerator):
    def __init__(self, dictionary: Dictionary):
        self._dictionary = dictionary

    def generate(self) -> list[Question]:
        questions_list = []

        for word in self._dictionary.get_words_list():
            if len(word.translations) == 1:
                mistake_details = f"Перевод слова: {word.translations[0]}"
            else:
                mistake_details = f"Варианты перевода слова: {", ".join(word.translations)}"
            question = Question(
                question_type=QuestionType.TRANSLATION_HANZI,
                #text=f"Какой перевод у слова {word.hanzi} ({word.pinyin})?: ",
                answers=word.translations,
                mistake_details=mistake_details
            )

            questions_list.append(question)

        return questions_list


