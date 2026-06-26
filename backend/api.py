from fastapi import APIRouter, Form

from services import trainer_service
from models.question_type import QuestionType

router = APIRouter()

@router.post("/lessons")
def start_lesson(question_type: str = Form(...)) -> list[int]:
    question_type_enum = QuestionType[question_type.upper()]
    return trainer_service.generate_questions_list_by_type(question_type_enum)


@router.get("/questions/{question_id}")
def get_question_by_id(question_id: int) -> str:
    return trainer_service.get_question_by_id(question_id)


@router.post("/questions/{question_id}/check_answer")
def check_user_answer(question_id: int, user_answer: str = Form(...)) -> bool:
    return trainer_service.check_user_answer(question_id, user_answer)