class Word:
    def __init__(self, hanzi: str, pinyin: str, tone: int, translations: list[str]):
        self.hanzi = hanzi
        self.pinyin = pinyin
        self.tone = tone
        self.translations = translations

