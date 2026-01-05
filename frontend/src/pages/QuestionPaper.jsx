import React, { useState, useEffect } from 'react';
import { createQuestionPaper, downloadQuestionPaperPDF, getSyllabi } from '../services/api';

const QuestionPaper = () => {
    const [syllabi, setSyllabi] = useState([]);
    const [selectedSyllabus, setSelectedSyllabus] = useState('');
    const [questionPaper, setQuestionPaper] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch syllabi on page load
    useEffect(() => {
        const fetchSyllabi = async () => {
            try {
                const data = await getSyllabi();
                setSyllabi(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSyllabi();
    }, []);

    const handleGenerate = async () => {
        if (!selectedSyllabus) {
            alert('Please select a syllabus');
            return;
        }

        setLoading(true);
        try {
            const res = await createQuestionPaper({ syllabusId: selectedSyllabus });
            if (res.success) setQuestionPaper(res.questionPaper);
            else alert('Failed to generate paper');
        } catch (err) {
            console.error(err);
            alert('Error generating question paper');
        }
        setLoading(false);
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Generate Question Paper</h2>

            <select
                className="border p-2 mb-4 w-full rounded"
                value={selectedSyllabus}
                onChange={(e) => setSelectedSyllabus(e.target.value)}
            >
                <option value="">Select Syllabus</option>
                {syllabi.map((s) => (
                    <option key={s._id} value={s._id}>
                        {s.courseName}
                    </option>
                ))}
            </select>

            <div className="flex gap-3 mb-4">
                <button
                    onClick={handleGenerate}
                    className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-800"
                >
                    {loading ? 'Generating...' : 'Generate Paper'}
                </button>

                {questionPaper && (
                    <button
                        onClick={() => downloadQuestionPaperPDF(selectedSyllabus)}
                        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
                    >
                        Download PDF
                    </button>
                )}
            </div>

            {questionPaper?.questions?.length > 0 && (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
        <h3 className="text-lg font-bold mb-2">Generated Question Paper</h3>
        <ul className="list-decimal pl-5 space-y-1">
            {questionPaper.questions.map((q, idx) => (
                <li key={idx} className="p-2 border-b">{q}</li>
            ))}
        </ul>
    </div>
)}

        </div>
    );
};

export default QuestionPaper;
