import random

from dictionary import Dictionary
from dictionary_service import create_dictionary
from question_generator import QuestionGenerator
from question_service import question_service
from question_type import QuestionType
from tone_hanzi_question_generator import ToneHanziQuestionGenerator
from tone_pinyin_question_generator import TonePinyinQuestionGenerator
from translation_hanzi_question_generator import TranslationHanziQuestionGenerator
from translation_pinyin_question_generator import TranslationPinyinQuestionGenerator


dictionary = create_dictionary()

def generate_questions_list_by_type(question_type: QuestionType) -> list[int]:
    generator = get_question_generator(question_type)
    questions_list = generator.generate()
    for q in questions_list:
        question_service.add_question(q)
    random.shuffle(questions_list)
    return [q.question_id for q in questions_list]


def get_question_by_id(question_id: int) -> str:
    question = question_service.get_question_by_id(question_id)
    with open(f"question_templates/{question.question_type.value}.html", "r", encoding="utf-8") as file:
        return file.read()


def check_user_answer(question_id: int, user_answer: str):
    question = question_service.get_question_by_id(question_id)
    return question.check(user_answer)


def get_question_generator(question_type: QuestionType) -> QuestionGenerator | None:
    global dictionary
    if question_type == QuestionType.TONE_HANZI:
        return ToneHanziQuestionGenerator(dictionary)
    elif question_type == QuestionType.TONE_PINYIN:
        return TonePinyinQuestionGenerator(dictionary)
    elif question_type == QuestionType.TRANSLATION_HANZI:
        return TranslationHanziQuestionGenerator(dictionary)
    elif question_type == QuestionType.TRANSLATION_PINYIN:
        return TranslationPinyinQuestionGenerator(dictionary)