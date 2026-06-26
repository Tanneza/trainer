from abc import ABC, abstractmethod

from models.question import Question


class QuestionGenerator(ABC):
    @abstractmethod
    def generate(self) -> list[Question]:
        pass
