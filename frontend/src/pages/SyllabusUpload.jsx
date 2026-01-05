import React, { useState } from 'react';
import { uploadSyllabus } from '../services/api';

const SyllabusUpload = () => {
    const [courseName, setCourseName] = useState('');
    const [units, setUnits] = useState([{ unitName: '', topics: [''] }]);

    const handleUnitChange = (index, value) => {
        const updatedUnits = [...units];
        updatedUnits[index].unitName = value;
        setUnits(updatedUnits);
    };

    const handleTopicChange = (unitIndex, topicIndex, value) => {
        const updatedUnits = [...units];
        updatedUnits[unitIndex].topics[topicIndex] = value;
        setUnits(updatedUnits);
    };

    const addUnit = () => {
        setUnits([...units, { unitName: '', topics: [''] }]);
    };

    const addTopic = (unitIndex) => {
        const updatedUnits = [...units];
        updatedUnits[unitIndex].topics.push('');
        setUnits(updatedUnits);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await uploadSyllabus({
                courseName,
                units: units.map(unit => ({
                    unitName: unit.unitName,
                    topics: unit.topics.filter(t => t.trim() !== '')
                }))
            });

            alert('Syllabus Uploaded');
            setCourseName('');
            setUnits([{ unitName: '', topics: [''] }]);
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Upload Syllabus</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Course Name"
                    className="border p-2 w-full mb-4 rounded"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />

                {units.map((unit, i) => (
                    <div key={i} className="mb-4 border p-3 rounded">
                        <input
                            type="text"
                            placeholder={`Unit ${i + 1} Name`}
                            className="border p-2 w-full mb-2 rounded"
                            value={unit.unitName}
                            onChange={(e) => handleUnitChange(i, e.target.value)}
                        />

                        {unit.topics.map((topic, j) => (
                            <input
                                key={j}
                                type="text"
                                placeholder={`Topic ${j + 1}`}
                                className="border p-2 w-full mb-1 rounded"
                                value={topic}
                                onChange={(e) =>
                                    handleTopicChange(i, j, e.target.value)
                                }
                            />
                        ))}

                        <button
                            type="button"
                            onClick={() => addTopic(i)}
                            className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
                        >
                            Add Topic
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addUnit}
                    className="bg-red-700 text-white px-3 py-1 mb-4 rounded"
                >
                    Add Unit
                </button>

                <br />

                <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    Upload Syllabus
                </button>
            </form>
        </div>
    );
};

export default SyllabusUpload;
