from fastapi import APIRouter, Form

from daily_phrase.phrase_dictionary_service import phrase_generator
from lesson_manager import lesson_manager
from services import trainer_service
from models.question_type import QuestionType
from services.statistics_service import statistics_service

router = APIRouter()


@router.get("/daily_phrase")
def get_phrase_of_day():
    phrase = phrase_generator.get_random_phrase()
    return {
        "hanzi": phrase.hanzi,
        "pinyin": phrase.pinyin,
        "translation": phrase.translation
    }


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