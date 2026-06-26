from models.dictionary import Dictionary

dictionaries = [
    # "словарь2.csv",
    # "местоимения.csv",
    # "основные глаголы.csv",
    # "времена года.csv",
    "погода.csv"
]


def create_dictionary():
    dictionary = Dictionary()

    for d in dictionaries:
        dictionary.load(d)

    return dictionary