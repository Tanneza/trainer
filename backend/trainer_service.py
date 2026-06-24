from question_service import question_service


def generate_questions_list_by_type(question_type: str):
    pass


def get_question_by_id(question_id: int) -> str:
    question = question_service.get_question_by_id(question_id)
    with open(f"question_templates/{question.get_type().value}.html", "r", encoding="utf-8") as file:
        return file.read()


def check_user_answer(question_id: int, user_answer: str):
    question = question_service.get_question_by_id(question_id)
    return question.check(user_answer)