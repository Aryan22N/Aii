const axios = require('axios');

const GEN_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const cleanText = (text) => {
    return text
        .replace(/`/g, '')        // remove backticks
        .replace(/\$/g, '')       // remove $ symbols
        .replace(/\\\{/g, '{')    // remove backslash before {
        .replace(/\\\}/g, '}')    // remove backslash before }
        .replace(/\\_/g, '_')     // remove backslash before _
        .trim();
};

const generateQuestionPaper = async (syllabus) => {
    // Build structured syllabus for the prompt
    const syllabusText = syllabus.units
        .map(u => `${u.unitName}: ${u.topics.join(', ')}`)
        .join('\n');

    const prompt = `
You are an AI exam generator.

Generate a balanced college exam paper for the following syllabus:
Course: ${syllabus.courseName}
Units and Topics:
${syllabusText}

Instructions:
- For each topic, generate at least 1-2 questions.
- Make questions varied: easy, medium, hard.
- Output JSON ONLY in this format:
{
  "questions": ["Question 1", "Question 2", ...]
}
- Remove all Markdown, backticks, LaTeX symbols. Keep plain text only.
`;

    const response = await axios.post(
        GEN_URL,
        { contents: [{ parts: [{ text: prompt }] }] },
        {
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': process.env.GEMINI_API_KEY
            }
        }
    );

    let text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    try {
        const data = JSON.parse(text);
        const cleanedQuestions = data.questions.map((q, idx) => `${idx + 1}. ${cleanText(q)}`);
        return { questions: cleanedQuestions };
    } catch (err) {
        console.error('Failed to parse Gemini response, using fallback');
        return { questions: [`1. ${cleanText(text)}`] };
    }
};

module.exports = { generateQuestionPaper };
