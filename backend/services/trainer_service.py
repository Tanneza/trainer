import random

from services.event_manager import event_manager
from services.question_generator_factory import get_question_generator

from services.question_service import question_service
from models.question_type import QuestionType


def generate_questions_list_by_type(question_type: QuestionType) -> list[int]:
    generator = get_question_generator(question_type)
    questions_list = generator.generate()
    random.shuffle(questions_list)
    return [q.question_id for q in questions_list]


def get_question_by_id(question_id: int) -> str:
    question = question_service.get_question_by_id(question_id)
    return question.html


def check_user_answer(question_id: int, lesson_id: int, user_answer: str) -> dict:
    question = question_service.get_question_by_id(question_id)
    check_result = question.check(user_answer)
    event_manager.notify("user_answer", {"lesson_id": lesson_id})
    result = {
        "result": check_result
    }

    if check_result:
        event_manager.notify("user_correct_answer", {"lesson_id": lesson_id})
    else:
        result["mistake_details"] = question.mistake_details

    return result





def get_lesson_types() -> dict:
    return {
        "lesson_types": [
            {
                "title": "Ханьцзы - Тоны",
                "code": "tone_hanzi"
            },
            {
                "title": "Пиньинь - Тоны",
                "code": "tone_pinyin"
            },
            {
                "title": "Ханьцзы - Перевод",
                "code": "translation_hanzi"
            },
            {
                "title": "Пиньинь - Перевод",
                "code": "translation_pinyin"
            },
            {
                "title": "Ханьцзы - Перевод ключа",
                "code": "radical_translation_hanzi"
            },
            {
                "title": "Ханьцзы - Номер ключа",
                "code": "radical_number_hanzi"
            },
            {
                "title": "Ханьцзы - Перевод цифры",
                "code": "numeral_translation_hanzi"
            },
            {
                "title": "Ханьцзы (официальный иероглиф) - Перевод цифры",
                "code": "numeral_translation_hanzi_bank"
            },
            {
                "title": "Пиньинь - Перевод цифры",
                "code": "numeral_translation_pinyin"
            }
        ]
    }