from models.radical import Radical


class RadicalsDictionary:
    def __init__(self):
        self.radicals_list: list[Radical] = []
        self.next_id = 0


    def load_radicals_from_file(self, filename: str):
        radicals_list: list[Radical] = []

        with open(f"dictionaries/{filename}", "r", encoding="utf-8") as file:
            file.readline()

            for line in file:
                number, hanzi, pinyin, tone, translations_str = line.split("\t")
                translations = [t.strip() for t in translations_str.split(",")]
                radicals_list.append(Radical(self.next_id, int(number.strip()), hanzi.strip(), pinyin.strip(), int(tone.strip()), translations))
                self.next_id += 1

        self.radicals_list.extend(radicals_list)

    def get_radicals_list(self) -> list[Radical]:
        return self.radicals_list