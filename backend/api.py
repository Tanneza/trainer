from fastapi import APIRouter, Path, Form

import trainer_service

router = APIRouter()

def generate_questions_list_by_type(question_type: str):
    pass


@router.get("/questions/{question_id}")
def get_question_by_id(question_id: int) -> str:
    return trainer_service.get_question_by_id(question_id)


@router.post("/questions/{question_id}/check_answer")
def check_user_answer(question_id: int, user_answer: str = Form(...)) -> bool:
    return trainer_service.check_user_answer(question_id, user_answer)