from models.radicals_dictionary import RadicalsDictionary

radicals_dictionaries = [
    "ключи 1 черта.csv"#,
    #"ключи 2 черты.csv",
    # "ключи 3 черты.csv",
    # "ключи 4 черты.csv",
    # "ключи 5 черт.csv",
    # "ключи 6 черт.csv",
    # "ключи 7 черт.csv",
    # "ключи 8 черт.csv",
    # "ключи 9 черт.csv",
    # "ключи 10 черт.csv",
    # "ключи 11 черт.csv",
    # "ключи 12 черт.csv",
    # "ключи 13 черт.csv",
    # "ключи 14 черт.csv",
    # "ключи 15 черт.csv",
    # "ключи 16 черт.csv",
    # "ключи 17 черт.csv"
]


def create_radicals_dictionary():
    radical_dictionary = RadicalsDictionary()

    for rd in radicals_dictionaries:
        radical_dictionary.load_radicals_from_file(rd)

    return radical_dictionary