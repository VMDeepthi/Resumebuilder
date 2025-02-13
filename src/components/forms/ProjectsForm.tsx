import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Project } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm: React.FC = () => {
  const { resume, updateResume } = useResume();

  const addProject = () => {
    updateResume({
      ...resume,
      projects: [
        ...resume.projects,
        {
          name: '',
          description: '',
          technologies: [],
          link: '',
        },
      ],
    });
  };

  const removeProject = (index: number) => {
    const newProjects = [...resume.projects];
    newProjects.splice(index, 1);
    updateResume({
      ...resume,
      projects: newProjects,
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const newProjects = [...resume.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value,
    };
    updateResume({
      ...resume,
      projects: newProjects,
    });
  };

  return (
    <div className="space-y-6">
      {resume.projects.map((project, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Project {index + 1}</h3>
            <button
              onClick={() => removeProject(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Technologies</label>
              <input
                type="text"
                value={project.technologies.join(', ')}
                onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                placeholder="e.g., React, Node.js, TypeScript"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Link</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => updateProject(index, 'link', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring- indigo-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;