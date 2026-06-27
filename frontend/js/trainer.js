import { startLesson as APIStartLesson } from "./api.js";
import { Question } from "./question.js";
import { QuestionNumber } from "./questionNumber.js";

export class Trainer {
  constructor(props) {
    this.questionType = props.questionType;

    this.questionsList = [];
    this.nextQuestionIndex = 0;
    this.questionNumber = null;
    this.question = null;
  }

  async startLesson() {
    console.log("Пользователь начал урок");

    this.questionsList = await APIStartLesson(this.questionType);

    console.log(`Список ID вопросов: [${this.questionsList}]`);

    this.nextQuestionIndex = 0;

    console.log(`Индекс вопроса: ${this.nextQuestionIndex}`);

    if (this.hasNextQuestion()) {
      this.questionNumber = new QuestionNumber({
        number: this.nextQuestionIndex + 1,
        count: this.questionsList.length,
      });
      this.questionNumber.onMount();

      const questionId = this.questionsList[this.nextQuestionIndex];

      console.log(`ID вопроса: ${questionId}`);

      this.question = new Question({
        id: questionId,
        onCorrectAnswer: () => {
          alert("Правильно!");

          if (this.hasNextQuestion()) {
            this.askNextQuestion();
          } else {
            this.finishLesson();
          }
        },
        onIncorrectAnswer: () => {
          alert("Неправильно!");

          if (this.hasNextQuestion()) {
            this.askNextQuestion();
          } else {
            this.finishLesson();
          }
        },
      });
      this.question.onMount();

      ++this.nextQuestionIndex;
    }
  }

  finishLesson() {
    console.log("Пользователь завершил урок");

    this.question.disableAnswerInput();
    this.question.disableSendAnswerButton();

    this.questionNumber.onUnmount();
    this.question.onUnmount();
  }

  hasNextQuestion() {
    return this.nextQuestionIndex < this.questionsList.length;
  }

  askNextQuestion() {
    console.log(`Индекс вопроса: ${this.nextQuestionIndex}`);

    this.questionNumber.updateProps({ number: this.nextQuestionIndex + 1 });

    const questionId = this.questionsList[this.nextQuestionIndex];

    console.log(`ID вопроса: ${questionId}`);

    this.question.updateProps({ id: questionId });
    this.question.clearAnswerInput();
    this.question.focusAnswerInput();

    ++this.nextQuestionIndex;
  }
}
