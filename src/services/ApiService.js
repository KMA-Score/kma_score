import { api } from "../utils/axios";

async function getStatistics() {
  try {
    const result = await api.get("/statistics");
    return result.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getStudentStatistics(studentId) {
  try {
    const result = await api.get(`/student/${studentId}`);
    result.data.data.scores.map((item) => {
      delete item.studentId;
      delete item.id;

      return item;
    });
    return result.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getSubjectStatistics(subjectId) {
  try {
    const result = await api.get(`/subject/${subjectId}`);
    return result.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getSubjects() {
  try {
    const result = await api.get("/subjects");
    return result.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function search(data) {
  try {
    const result = await api.get(`/search?query=${data}`);
    return result.data.data;
  } catch (error) {
    console.error(error);
  }
}

export {
  getStatistics,
  getStudentStatistics,
  getSubjectStatistics,
  getSubjects,
  search,
};
