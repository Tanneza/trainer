from dictionary import Dictionary
from question import Question
from question_generator import QuestionGenerator


class TranslationPinyinQuestionGenerator(QuestionGenerator):
    def __init__(self, dictionary: Dictionary):
        self._dictionary = dictionary

    def generate(self) -> list[Question]:
        question_list = []
        for word in self._dictionary.get_words_list():
            if len(word.translations) == 1:
                mistake_details = f"Перевод слова: {word.translations[0]}"
            else:
                mistake_details = f"Варианты перевода слова: {", ".join(word.translations)}"
            question = Question(
                text=f"Какой перевод у слова {word.pinyin} ({word.hanzi})?: ",
                answers=word.translations,
                mistake_details=mistake_details
            )

            question_list.append(question)

        return question_list