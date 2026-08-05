from models.lesson import Lesson


class LessonManager:
    def __init__(self):
        self.lesson_id = 0

    def create_new_lesson(self) -> Lesson:
        new_lesson = Lesson(self.lesson_id)
        self.lesson_id += 1
        return new_lesson

lesson_manager = LessonManager()