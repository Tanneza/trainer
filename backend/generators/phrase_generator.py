import random

from models.phrase_dictionary import PhraseDictionary
from models.phrase import Phrase


class PhraseGenerator:
    def __init__(self, phrase_dict: PhraseDictionary):
        self.phrase_dict = phrase_dict


    def get_random_phrase(self) -> Phrase:
        return random.choice(self.phrase_dict.phrases_list)


    @staticmethod
    def get_phrase_template(phrase: Phrase) -> str:
        with open(f"templates/daily_phrase.html", "r", encoding="utf-8") as file:
            phrase_template = file.read()
        return phrase_template.format(
            hanzi=phrase.hanzi,
            pinyin=phrase.pinyin,
            translation=phrase.translation
        )


    def get_rendered_phrase(self) -> str:
        random_phrase = self.get_random_phrase()
        return self.get_phrase_template(random_phrase)