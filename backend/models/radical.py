class Radical:
    def __init__(self, word_id: int, number: int, hanzi: str, pinyin: str, tone: int, translations: list[str]):
        self.word_id = word_id
        self.number = number
        self.hanzi = hanzi
        self.pinyin = pinyin
        self.tone = tone
        self.translations = translations