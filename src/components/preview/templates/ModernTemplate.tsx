import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';

const ModernTemplate: React.FC = () => {
  const { resume } = useResume();

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <header className="border-b-2 border-indigo-600 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{resume.personalInfo.fullName}</h1>
        <h2 className="text-xl text-indigo-600 mt-1">{resume.personalInfo.title}</h2>
        
        <div className="flex flex-wrap gap-4 mt-3 text-gray-600">
          {resume.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              {resume.personalInfo.email}
            </div>
          )}
          {resume.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              {resume.personalInfo.phone}
            </div>
          )}
          {resume.personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {resume.personalInfo.location}
            </div>
          )}
        </div>
      </header>

      {resume.personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
          <div className="space-y-4">
            {resume.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-indigo-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{exp.position}</h4>
                    <div className="text-indigo-600">{exp.company}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
          <div className="space-y-4">
            {resume.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-indigo-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                    <div className="text-indigo-600">{edu.school}</div>
                    <div className="text-gray-600">{edu.fieldOfStudy}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.description && (
                  <p className="mt-2 text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
          <div className="space-y-4">
            {resume.projects.map((project, index) => (
              <div key={index} className="border-l-2 border-indigo-200 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 flex items-center"
                    >
                      <LinkIcon className="h-4 w-4 mr-1" />
                      View Project
                    </a>
                  )}
                </div>
                <p className="mt-2 text-gray-700">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-block px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.personalInfo.declaration && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Declaration</h3>
          <p className="text-gray-700 text-sm italic">{resume.personalInfo.declaration}</p>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;