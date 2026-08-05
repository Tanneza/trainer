from fastapi import APIRouter, Form

from services import trainer_service

router = APIRouter()


@router.get("/questions/{question_id}")
def get_question_by_id(question_id: int) -> dict:
    question_html = trainer_service.get_question_by_id(question_id)
    return {
        "html": question_html
    }


@router.post("/questions/{question_id}/check_answer")
def check_user_answer(
        question_id: int,
        lesson_id: int = Form(...),
        user_answer: str = Form(...)
    ) -> dict:
    return trainer_service.check_user_answer(question_id, lesson_id, user_answer)