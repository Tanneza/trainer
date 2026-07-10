class Phrase:
    def __init__(self, hanzi: str, pinyin: str, translation: str, comments: str):
        self.hanzi = hanzi
        self.pinyin = pinyin
        self.translation = translation
        self.comments = comments


    def __str__(self):
        return f"{self.hanzi}\n({self.pinyin})\n{self.translation}"