// src/services/api.js
import axios from 'axios';

const API_URL = axios.create({
    baseURL: 'http://localhost:5001/api'
});

export const uploadSyllabus = (data) => API_URL.post('/syllabus', data);

export const getSyllabi = async () => {
    const res = await API_URL.get('/syllabus');
    return res.data.syllabi || [];
};
export const createQuestionPaper = async (data) => {
    try {
        const res = await API_URL.post('/question-paper', data);
        return res.data;
    } catch (err) {
        console.error('Error calling question paper API', err);
        return { success: false, questionPaper: { questions: [] } };
    }
};

export const createStudyPlan = async (data) => {
    try {
        const res = await API_URL.post('/study-planner', data);
        return res.data;
    } catch (err) {
        console.error('Error calling study planner API', err);
        return { success: false, studyPlan: { schedule: [] } };
    }
};

export const generateQuestionPaper = async (syllabusId) => {
    const res = await axios.post(`${API_URL}/question-paper`, { syllabusId });
    return res.data;
};

export const generateStudyPlan = async (syllabusId, examDate, hoursPerDay) => {
    const res = await axios.post(`${API_URL}/study-plan`, { syllabusId, examDate, hoursPerDay });
    return res.data;
};

export const sendAIMessage = async (message, context = {}) => {
    const res = await axios.post(`${API_URL}/chat`, { message, context });
    return res.data.reply;
};

export const downloadQuestionPaperPDF = (syllabusId) => {
    window.open(`http://localhost:5001/api/question-paper/download/${syllabusId}`, '_blank');
};