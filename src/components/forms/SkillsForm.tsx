import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { X } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const { resume, updateResume } = useResume();
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !resume.skills.includes(newSkill.trim())) {
      updateResume({
        ...resume,
        skills: [...resume.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateResume({
      ...resume,
      skills: resume.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addSkill} className="space-y-4">
        <div>
          <label htmlFor="skill" className="block text-sm font-medium text-gray-700">
            Add Skill
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., JavaScript, React, Node.js"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {resume.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-2 inline-flex items-center p-0.5 rounded-full text-indigo-600 hover:text-indigo-800 hover:bg-indigo-200"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;