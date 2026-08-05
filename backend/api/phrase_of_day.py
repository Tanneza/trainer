from fastapi import APIRouter

from services.phrase_dictionary_service import phrase_generator

router = APIRouter()

@router.get("/phrase_of_day")
def get_phrase_of_day():
    html_phrase = phrase_generator.get_rendered_phrase()
    return html_phrase