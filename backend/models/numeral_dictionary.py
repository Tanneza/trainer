from models.numeral import Numeral


class NumeralDictionary:
    def __init__(self):
        self.numerals_list: list[Numeral] = []
        self.next_id = 0


    def load_numerals_from_file(self, filename: str):
        numerals_list: list[Numeral] = []

        with open(f"dictionaries/{filename}", "r", encoding="utf-8") as file:
            file.readline()

            for line in file:
                hanzi_bank, hanzi, pinyin, tone, translation = line.split("\t")
                numerals_list.append(Numeral(self.next_id, hanzi_bank.strip(), hanzi.strip(), pinyin.strip(), int(tone.strip()), translation.strip()))
                self.next_id += 1

        self.numerals_list.extend(numerals_list)

    def get_numerals_list(self) -> list[Numeral]:
        return self.numerals_list