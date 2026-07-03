from typing import Callable


class EventManager:
    def __init__(self):
        self.observers: dict[str, list[Callable]] = {}


    def add_observer(self, event_name: str, observer: Callable):
        if event_name not in self.observers:
            self.observers[event_name] = []

        self.observers[event_name].append(observer)


    def notify(self, event_name):
        if event_name not in self.observers:
            return
        for observer in self.observers[event_name]:
            observer()


event_manager = EventManager()