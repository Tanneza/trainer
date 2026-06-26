import random

from dictionary import Dictionary
from question import Question
from generators.tone_hanzi_question_generator import ToneHanziQuestionGenerator
from generators.tone_pinyin_question_generator import TonePinyinQuestionGenerator
from generators.translation_hanzi_question_generator import TranslationHanziQuestionGenerator
from generators.translation_pinyin_question_generator import TranslationPinyinQuestionGenerator


class Trainer:
    def __init__(self, dictionary: Dictionary):
        self.questions_list: list[Question] = []
        self.mistakes = []
        self.dictionary = dictionary
        self.score = 0
        self.total = 0
        self.current_round = 1


    def run_trainer(self):
        print("你好! Добро пожаловать в тренажер китайского языка!")
        print("Выберите тип вопроса")
        print("1 - номер тона по ханзи")
        print("2 - номер тона по пиньинь")
        print("3 - перевод для ханзи")
        print("4 - перевод для пиньинь")
        question_type = input("Введите номер варианта: ")
        while question_type not in ("1", "2", "3", "4"):
            question_type = input("Введите, пожалуйста, число от 1 до 4: ")
        if question_type == "1" or question_type == "2":
            print("Введите цифру тона (0, 1, 2, 3 или 4). Для выхода введите 'q'.")
        elif question_type == "3" or question_type == "4":
            print("Введите перевод слова. Для выхода введите 'q'.")

        if question_type == "1":
            question_generator = ToneHanziQuestionGenerator(self.dictionary)
        elif question_type == "2":
            question_generator = TonePinyinQuestionGenerator(self.dictionary)
        elif question_type == "3":
            question_generator = TranslationHanziQuestionGenerator(self.dictionary)
        elif question_type == "4":
            question_generator = TranslationPinyinQuestionGenerator(self.dictionary)

        self.questions_list = question_generator.generate()

        while self.ask_question():
            pass  # просто крутит цикл

        # Завешение:
        print("\n🎉🎉🎉 Тренировка завершена! 🎉🎉🎉")
        print(f"Итоговый счет: {self.score}/{self.total}")

        if self.total > 0:
            print(f"Точность ответов: {self.score/self.total*100:.1f}%.")

        if self.current_round > 1:
            print(f"Потребовалось раундов: {self.current_round}.")


    def _work_on_mistakes(self):
        if self.mistakes:
            self.current_round += 1
            print(f"\nРаунд {self.current_round}. Исправим ошибки😊!")
            print(f"Вопросов для повторения: {len(self.mistakes)}.\n")
            self.questions_list = self.mistakes.copy()
            self.mistakes.clear()
            return True # ошибки есть, продолжаем

        return  False # ошибок нет, игра закончена


    def ask_question(self):
        # Задает один вопрос. Возвращает True, если игра продолжается.

        # если нет слов, пытаемся перейти на следующий раунд:
        if not self.questions_list and not self._work_on_mistakes():
            return False

        # выбор случайного слова (и ключ, и значение):
        question = random.choice(self.questions_list)

        user_answer = input(question.get_text())

        # пользователь заканчивает игру:
        if user_answer.lower() == "q":
            return False

        self.total += 1

        if question.check(user_answer):
            print("✔ Правильно!")
            self.score += 1
        else:
            print(f"❌ Неправильно. {question.get_mistake_details()}.")
            self.mistakes.append(question)

        # убираем слово из текущего списка
        self.questions_list.remove(question)

        # статистика:
        print(f"Счет: {self.score}/{self.total}")
        print(f"Осталось вопросов: {len(self.questions_list)}.\n ")

        return True



