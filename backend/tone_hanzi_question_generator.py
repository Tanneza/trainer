from dictionary import Dictionary
from question import Question
from question_generator import QuestionGenerator


class ToneHanziQuestionGenerator(QuestionGenerator):
    def __init__(self, dictionary: Dictionary):
        self._dictionary = dictionary

    def generate(self) -> list[Question]:
        questions_list = []

        for word in self._dictionary.get_words_list():
            question = Question(
                text=f"Какие номера тонов у слова {word.hanzi} ({word.pinyin} - {", ".join(word.translations)})?: ",
                answers=[str(word.tone)],
                mistake_details=f"Это тон {word.tone}"
            )

            questions_list.append(question)

        return questions_list


