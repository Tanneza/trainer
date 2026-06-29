import { LessonView } from "./lessonView.js";
import { LessonTypeSelectionView } from "./lessonTypeSelectionView.js";
import { ViewManager } from "./viewManager.js";
import { Trainer } from "./trainer.js";

const viewManager = new ViewManager();
const lessonView = new LessonView();
const lessonTypeSelectionView = new LessonTypeSelectionView({
  onStartLesson: (questionType) => {
    viewManager.switch(lessonView);

    const trainer = new Trainer({ questionType });
    trainer.startLesson();
  },
});

viewManager.switch(lessonTypeSelectionView);
