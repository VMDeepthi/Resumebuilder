import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Experience } from '../../types/resume';
import { improveDescription } from '../../services/gemini';
import { Wand2, Plus, Trash2 } from 'lucide-react';

const ExperienceForm: React.FC = () => {
  const { resume, updateResume } = useResume();

  const addExperience = () => {
    updateResume({
      ...resume,
      experience: [
        ...resume.experience,
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const newExperience = [...resume.experience];
    newExperience.splice(index, 1);
    updateResume({
      ...resume,
      experience: newExperience,
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...resume.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    updateResume({
      ...resume,
      experience: newExperience,
    });
  };

  const improveExperienceDescription = async (index: number) => {
    const description = resume.experience[index].description;
    const improvedDescription = await improveDescription(description);
    updateExperience(index, 'description', improvedDescription);
  };

  return (
    <div className="space-y-6">
      {resume.experience.map((exp, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Experience {index + 1}</h3>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={exp.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <div className="mt-1 relative">
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                onClick={() => improveExperienceDescription(index)}
                className="absolute right-2 bottom-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
              >
                <Wand2 className="h-4 w-4 mr-1" />
                Improve
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;