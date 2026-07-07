class Lesson:
    def __init__(self):
        self.lesson_id = 0

    def create_new_lesson(self) -> int:
        self.lesson_id += 1
        return self.lesson_id

lesson_manager = Lesson()