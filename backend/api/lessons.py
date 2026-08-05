from fastapi import APIRouter, Form

from services.lesson_manager import lesson_manager
from models.question_type import QuestionType
from services import trainer_service
from services.statistics_service import statistics_service

router = APIRouter()


@router.post("/lessons")
def start_lesson(question_type: str = Form(...)) -> dict:
    new_lesson = lesson_manager.create_new_lesson()
    question_type_enum = QuestionType[question_type.upper()]
    question_ids = trainer_service.generate_questions_list_by_type(question_type_enum)
    return {
        "lesson_id": new_lesson.lesson_id,
        "question_ids": question_ids
    }


@router.get("/lessons/lesson_types")
def get_lesson_types() -> dict:
    return trainer_service.get_lesson_types()


@router.get("/lessons/{lesson_id}/statistics")
def get_lesson_statistics(lesson_id: int) -> dict:
    return statistics_service.lesson_statistics(lesson_id)