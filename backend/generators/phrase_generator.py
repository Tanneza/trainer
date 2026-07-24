import random

from models.phrase_dictionary import PhraseDictionary
from models.phrase import Phrase


class PhraseGenerator:
    def __init__(self, phrase_dict: PhraseDictionary):
        self.phrase_dict = phrase_dict


    def get_random_phrase(self) -> Phrase:
        return random.choice(self.phrase_dict.phrases_list)