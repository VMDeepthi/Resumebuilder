import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Education } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { resume, updateResume } = useResume();

  const addEducation = () => {
    updateResume({
      ...resume,
      education: [
        ...resume.education,
        {
          school: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const newEducation = [...resume.education];
    newEducation.splice(index, 1);
    updateResume({
      ...resume,
      education: newEducation,
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...resume.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    updateResume({
      ...resume,
      education: newEducation,
    });
  };

  return (
    <div className="space-y-6">
      {resume.education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Education {index + 1}</h3>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">School</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => updateEducation(index, 'school', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
              <input
                type="text"
                value={edu.fieldOfStudy}
                onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={edu.description}
              onChange={(e) => updateEducation(index, 'description', e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </button>
    </div>
  );
};

export default EducationForm;