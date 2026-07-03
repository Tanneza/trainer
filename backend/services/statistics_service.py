from event_manager import event_manager


class StatisticsService:
    def __init__(self):
        self.score = 0
        self.total = 0

        event_manager.add_observer("user_answer", self.on_user_answer)
        event_manager.add_observer("user_correct_answer", self.on_user_correct_answer)


    def on_user_answer(self):
        self.total += 1


    def on_user_correct_answer(self):
        self.score += 1


    def lesson_statistics(self, lesson_id: int) -> dict:
        return {
                "score": self.score,
                "total": self.total,
                "rate": self.score / self.total if self.total > 0 else 0.0
            }


statistics_service = StatisticsService()