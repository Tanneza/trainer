export async function getLessonTypes() {
  try {
    const response = await fetch(`/api/lessons/lesson_types`, {
      method: "GET",
    });

    return await response.json();
  } catch (err) {
    console.error("Ошибка!", err);
  }
}

export async function startLesson(lessonType) {
  try {
    const formData = new FormData();
    formData.append("question_type", lessonType);

    const response = await fetch("/api/lessons", {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (err) {
    console.error("Ошибка!", err);
  }
}

export async function getLessonStatistics(lessonId) {
  try {
    const response = await fetch(`/api/lessons/${lessonId}/statistics`, {
      method: "GET",
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

export async function checkAnswer(lessonId, questionId, userAnswer) {
  try {
    const formData = new FormData();
    formData.append("lesson_id", lessonId);
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
