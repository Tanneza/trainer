from word import Word


class Dictionary:
    def __init__(self):
        self.words_list: list[Word] = []


    def load(self, filename: str):
        words_list: list[Word] = []

        with open(f"dictionaries/{filename}", "r", encoding="utf-8") as file:
            file.readline()
            for line in file:
                hanzi, pinyin, tone, translations_str = line.split("\t")
                translations = [t.strip() for t in translations_str.split(",")]
                words_list.append(Word(hanzi.strip(), pinyin.strip(), int(tone.strip()), translations))

        self.words_list.extend(words_list)


    def get_words_list(self) -> list[Word]:
        return self.words_list