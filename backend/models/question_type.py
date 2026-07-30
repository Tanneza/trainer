from enum import Enum


class QuestionType(Enum):
    TONE_HANZI = "tone_hanzi"
    TONE_PINYIN = "tone_pinyin"
    TRANSLATION_HANZI = "translation_hanzi"
    TRANSLATION_PINYIN = "translation_pinyin"
    RADICAL_TRANSLATION_HANZI = "radical_translation_hanzi"
    RADICAL_NUMBER_HANZI = "radical_number_hanzi"