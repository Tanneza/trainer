class Numeral:
    def __init__(self, word_id: int, hanzi_bank: str, hanzi: str, pinyin: str, tone: int, translation: str):
        self.word_id = word_id
        self.hanzi_bank = hanzi_bank
        self.hanzi = hanzi
        self.pinyin = pinyin
        self.tone = tone
        self.translation = translation