from event_manager import event_manager
from models.statistics import Statistics


class StatisticsService:
    def __init__(self):
        self.statistics_by_lesson_id: dict[int, Statistics] = {}

        event_manager.add_observer("user_answer", self.on_user_answer)
        event_manager.add_observer("user_correct_answer", self.on_user_correct_answer)


    def on_user_answer(self, event_params: dict):
        lesson_id = event_params.get("lesson_id")
        if lesson_id not in self.statistics_by_lesson_id:
            self.statistics_by_lesson_id[lesson_id] = Statistics()
        self.statistics_by_lesson_id[lesson_id].total += 1


    def on_user_correct_answer(self, event_params: dict):
        lesson_id = event_params.get("lesson_id")
        if lesson_id not in self.statistics_by_lesson_id:
            self.statistics_by_lesson_id[lesson_id] = Statistics()
        self.statistics_by_lesson_id[lesson_id].score += 1


    def lesson_statistics(self, lesson_id: int) -> dict:
        stats = self.statistics_by_lesson_id[lesson_id]
        return {
                "score": stats.score,
                "total": stats.total,
                "rate": stats.score / stats.total if stats.total > 0 else 0.0
            }


statistics_service = StatisticsService()