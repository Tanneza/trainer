from generators.phrase_generator import PhraseGenerator
from models.phrase_dictionary import PhraseDictionary

prase_dictionaries = [
    "совет дня.csv"
]


def create_phrase_generator() -> PhraseGenerator:
    phrase_dictionary = PhraseDictionary()
    for d in prase_dictionaries:
        phrase_dictionary.load_from_file(d)
    return PhraseGenerator(phrase_dictionary)


phrase_generator = create_phrase_generator()