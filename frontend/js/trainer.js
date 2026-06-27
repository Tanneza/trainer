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

    this.questionNumber = new QuestionNumber();
    this.question = new Question({
      onCorrectAnswer: () => {
        alert("Правильно!");
      },
      onIncorrectAnswer: (mistake_id) => {
        alert("Неправильно!");

        this.mistakesList.push(mistake_id);
      },
      onAnyAnswer: () => {
        if (this.hasNextQuestion()) {
          this.askNextQuestion();
        } else {
          this.finishRound();
        }
      },
    });

    this.questionNumber.onMount();
    this.question.onMount();

    this.startRound();
  }

  finishLesson() {
    console.log("Пользователь завершил урок");

    this.question.disableSendAnswerButton();
    this.question.disableAnswerInput();

    this.questionNumber.onUnmount();
    this.question.onUnmount();
  }

  startRound() {
    console.log("Пользователь начал раунд");

    console.log(`Список ID вопросов: [${this.questionsList}]`);

    this.mistakesList = [];
    this.nextQuestionIndex = 0;

    if (this.hasNextQuestion()) {
      this.askNextQuestion();
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

    this.questionNumber.updateProps({
      number: this.nextQuestionIndex + 1,
      count: this.questionsList.length,
    });

    const questionId = this.questionsList[this.nextQuestionIndex];

    console.log(`ID вопроса: ${questionId}`);

    this.question.updateProps({ id: questionId });
    this.question.clearAnswerInput();
    this.question.focusAnswerInput();

    ++this.nextQuestionIndex;
  }
}
