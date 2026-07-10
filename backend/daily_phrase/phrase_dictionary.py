from daily_phrase.phrase import Phrase


class PhraseDictionary:
    def __init__(self):
        self.phrases_list: list[Phrase] = []


    def phrase_load(self, filename: str):
        with open(f"dictionaries/{filename}", "r", encoding="utf-8") as file:
            file.readline()
            for line in file:
                hanzi, pinyin, translation, comments = line.split("\t")
                self.phrases_list.append(Phrase(hanzi.strip(), pinyin.strip(), translation.strip(), comments.strip()))