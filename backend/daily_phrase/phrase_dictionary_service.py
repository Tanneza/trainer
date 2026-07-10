from daily_phrase.creator_of_phrases import CreatorOfPhrase
from daily_phrase.phrase_dictionary import PhraseDictionary

prase_dictionaries = [
    "совет дня.csv"
]


def get_today_phrase() -> CreatorOfPhrase:
    phrase_dictionary = PhraseDictionary()
    for d in prase_dictionaries:
        phrase_dictionary.phrase_load(d)
    return CreatorOfPhrase(phrase_dictionary)


phrase_of_day = get_today_phrase()