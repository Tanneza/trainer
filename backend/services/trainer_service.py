import random

from event_manager import event_manager
from generators.numeral_translation_hanzi_bank_question_generator import NumeralTranslationHanziBankQuestionGenerator
from generators.numeral_translation_hanzi_question_generator import NumeralTranslationHanziQuestionGenerator
from generators.numeral_translation_pinyin_question_generator import NumeralTranslationPinyinQuestionGenerator
from generators.radical_number_hanzi_question_generator import RadicalNumberHanziQuestionGenerator
from generators.radical_translation_hanzi_question_generator import RadicalTranslationHanziQuestionGenerator
from services.numeral_dictionary_service import create_numerals_dictionary
from services.radicals_dictionary_service import create_radicals_dictionary
from services.dictionary_service import create_dictionary
from generators.question_generator import QuestionGenerator
from services.question_service import question_service
from models.question_type import QuestionType
from generators.tone_hanzi_question_generator import ToneHanziQuestionGenerator
from generators.tone_pinyin_question_generator import TonePinyinQuestionGenerator
from generators.translation_hanzi_question_generator import TranslationHanziQuestionGenerator
from generators.translation_pinyin_question_generator import TranslationPinyinQuestionGenerator


dictionary = create_dictionary()
radicals_dictionary = create_radicals_dictionary()
numeral_dictionary = create_numerals_dictionary()


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


def get_question_generator(question_type: QuestionType) -> QuestionGenerator | None:
    global dictionary
    global radicals_dictionary
    global numeral_dictionary

    if question_type == QuestionType.TONE_HANZI:
        return ToneHanziQuestionGenerator(dictionary)
    elif question_type == QuestionType.TONE_PINYIN:
        return TonePinyinQuestionGenerator(dictionary)
    elif question_type == QuestionType.TRANSLATION_HANZI:
        return TranslationHanziQuestionGenerator(dictionary)
    elif question_type == QuestionType.TRANSLATION_PINYIN:
        return TranslationPinyinQuestionGenerator(dictionary)
    elif question_type == QuestionType.RADICAL_TRANSLATION_HANZI:
        return RadicalTranslationHanziQuestionGenerator(radicals_dictionary)
    elif question_type == QuestionType.RADICAL_NUMBER_HANZI:
        return RadicalNumberHanziQuestionGenerator(radicals_dictionary)
    elif question_type == QuestionType.NUMERAL_TRANSLATION_HANZI:
        return NumeralTranslationHanziQuestionGenerator(numeral_dictionary)
    elif question_type == QuestionType.NUMERAL_TRANSLATION_HANZI_BANK:
        return NumeralTranslationHanziBankQuestionGenerator(numeral_dictionary)
    elif question_type == QuestionType.NUMERAL_TRANSLATION_PINYIN:
        return NumeralTranslationPinyinQuestionGenerator(numeral_dictionary)
    else:
        raise Exception("Неизвестный тип")


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
                "title": "Ханьцзы - Перевод цифры (банковской)",
                "code": "numeral_translation_hanzi_bank"
            },
            {
                "title": "Пиньинь - Перевод цифры",
                "code": "numeral_translation_pinyin"
            }
        ]
    }