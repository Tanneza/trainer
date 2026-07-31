from models.numeral_dictionary import NumeralDictionary

numeral_dictionaries = [
   "цифры.csv"
]


def create_numerals_dictionary():
    numeral_dictionary = NumeralDictionary()

    for nd in numeral_dictionaries:
        numeral_dictionary.load_numerals_from_file(nd)

    return numeral_dictionary