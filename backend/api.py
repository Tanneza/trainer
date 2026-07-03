from fastapi import APIRouter, Form

from services import trainer_service
from models.question_type import QuestionType
from services.statistics_service import statistics_service

router = APIRouter()

@router.post("/lessons")
def start_lesson(question_type: str = Form(...)) -> dict:
    question_type_enum = QuestionType[question_type.upper()]
    question_ids = trainer_service.generate_questions_list_by_type(question_type_enum)
    return {
        "question_ids": question_ids
    }


@router.get("/lessons/{lesson_id}/statistics")
def get_lesson_statistics(lesson_id: int) -> dict:
    return statistics_service.lesson_statistics(lesson_id)


@router.get("/questions/{question_id}")
def get_question_by_id(question_id: int) -> dict:
    question_html = trainer_service.get_question_by_id(question_id)
    return {
        "html": question_html
    }


@router.post("/questions/{question_id}/check_answer")
def check_user_answer(question_id: int, user_answer: str = Form(...)) -> dict:
    return trainer_service.check_user_answer(question_id, user_answer)