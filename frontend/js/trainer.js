import { startLesson as APIStartLesson } from "./api.js";
import { Question } from "./question.js";
import { QuestionNumber } from "./questionNumber.js";

export class Trainer {
  constructor(props) {
    this.questionType = props.questionType;

    this.questionsList = [];
    this.mistakesList = null;
    this.nextQuestionIndex = 0;
    this.questionNumber = null;
    this.question = null;
  }

  async startLesson() {
    console.log("Пользователь начал урок");

    this.questionsList = await APIStartLesson(this.questionType);

    this.startRound();
  }

  finishLesson() {
    console.log("Пользователь завершил урок");

    this.question.disableAnswerInput();
    this.question.disableSendAnswerButton();

    this.questionNumber.onUnmount();
    this.question.onUnmount();
  }

  startRound() {
    console.log("Пользователь начал раунд");

    console.log(`Список ID вопросов: [${this.questionsList}]`);

    this.mistakesList = [];
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
            this.finishRound();
          }
        },
        onIncorrectAnswer: (mistake_id) => {
          alert("Неправильно!");

          this.mistakesList.push(mistake_id);

          if (this.hasNextQuestion()) {
            this.askNextQuestion();
          } else {
            this.finishRound();
          }
        },
      });
      this.question.onMount();

      ++this.nextQuestionIndex;
    }
  }

  finishRound() {
    console.log("Пользователь завершил раунд");

    if (this.mistakesList.length > 0) {
      console.log("Поработаем над ошибками");

      this.questionsList = this.mistakesList;

      this.startRound();
    } else {
      this.finishLesson();
    }
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
