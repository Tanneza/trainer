export async function startLesson(questionType) {
  try {
    const formData = new FormData();
    formData.append("question_type", questionType);

    const response = await fetch("/api/lessons", {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (err) {
    console.error("Ошибка!", err);
  }
}

export async function getQuestionById(questionId) {
  try {
    const response = await fetch(`/api/questions/${questionId}`, {
      method: "GET",
    });

    return await response.json();
  } catch (err) {
    console.error("Ошибка!", err);
  }
}

export async function checkAnswer(questionId, userAnswer) {
  try {
    const formData = new FormData();
    formData.append("user_answer", userAnswer);

    const response = await fetch(`/api/questions/${questionId}/check_answer`, {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (err) {
    console.error("Ошибка!", err);
  }
}
