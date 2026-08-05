from generators.numeral_translation_hanzi_bank_question_generator import NumeralTranslationHanziBankQuestionGenerator
from generators.numeral_translation_hanzi_question_generator import NumeralTranslationHanziQuestionGenerator
from generators.numeral_translation_pinyin_question_generator import NumeralTranslationPinyinQuestionGenerator
from generators.radical_number_hanzi_question_generator import RadicalNumberHanziQuestionGenerator
from generators.radical_translation_hanzi_question_generator import RadicalTranslationHanziQuestionGenerator
from models.question_type import QuestionType
from services.numeral_dictionary_service import create_numerals_dictionary
from services.radicals_dictionary_service import create_radicals_dictionary
from services.dictionary_service import create_dictionary
from generators.question_generator import QuestionGenerator
from generators.tone_hanzi_question_generator import ToneHanziQuestionGenerator
from generators.tone_pinyin_question_generator import TonePinyinQuestionGenerator
from generators.translation_hanzi_question_generator import TranslationHanziQuestionGenerator
from generators.translation_pinyin_question_generator import TranslationPinyinQuestionGenerator


dictionary = create_dictionary()
radicals_dictionary = create_radicals_dictionary()
numeral_dictionary = create_numerals_dictionary()


def get_question_generator(question_type: QuestionType) -> QuestionGenerator:
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