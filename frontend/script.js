async function main() {
  document.getElementById("send-answer-button").addEventListener("click", async (e) => {
    e.preventDefault();

    console.log("Нажата кнопка отправки ответа");

    const userAnswer = document.getElementById("answer-input").value;

    console.log(`User answer = ${userAnswer}`);

    const check_result = await checkAnswer(questionId, userAnswer);

    console.log(`Check result = ${check_result}`);
  });

  const questionType = "tone_hanzi";
  const questionsList = await startLesson(questionType);

  console.log(`Questions list = ${questionsList}`);

  const questionId = questionsList[0];
  const question_html = await getQuestionById(questionId);

  console.log(`Question = ${question_html}`);

  document.getElementById("question-html").innerHTML = question_html;
}

main();
