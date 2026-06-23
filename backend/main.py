from dictionary import Dictionary
from trainer import Trainer


dictionaries = [
    # "словарь2.csv",
    # "местоимения.csv",
    # "основные глаголы.csv",
    # "времена года.csv",
    "погода.csv"
]

dictionary = Dictionary()

for d in dictionaries:
    dictionary.load(d)

train = Trainer(dictionary)
train.run_trainer()

