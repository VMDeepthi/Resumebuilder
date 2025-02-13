import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';

const MinimalistTemplate: React.FC = () => {
  const { resume } = useResume();

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-normal text-gray-900">{resume.personalInfo.fullName}</h1>
        <h2 className="text-lg text-gray-600 mt-1">{resume.personalInfo.title}</h2>
        
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          {resume.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              {resume.personalInfo.email}
            </div>
          )}
          {resume.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              {resume.personalInfo.phone}
            </div>
          )}
          {resume.personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {resume.personalInfo.location}
            </div>
          )}
        </div>
      </header>

      {resume.personalInfo.summary && (
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg text-gray-900 mb-4">Experience</h3>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-medium text-gray-900">{exp.position}</h4>
                  <div className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <div className="text-gray-600 mb-2">{exp.company}</div>
                <p className="text-gray-700 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg text-gray-900 mb-4">Education</h3>
          <div className="space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                  <div className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                <div className="text-gray-600">{edu.school}</div>
                <div className="text-gray-600 text-sm">{edu.fieldOfStudy}</div>
                {edu.description && (
                  <p className="mt-2 text-gray-700 text-sm">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.projects.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg text-gray-900 mb-4">Projects</h3>
          <div className="space-y-6">
            {resume.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 flex items-center text-sm"
                    >
                      <LinkIcon className="h-3 w-3 mr-1" />
                      View
                    </a>
                  )}
                </div>
                <p className="text-gray-700 text-sm">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    {project.technologies.join(' · ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg text-gray-900 mb-4">Skills</h3>
          <div className="text-gray-700">
            {resume.skills.join(' · ')}
          </div>
        </section>
      )}

      {resume.personalInfo.declaration && (
        <section>
          <h3 className="text-lg text-gray-900 mb-4">Declaration</h3>
          <p className="text-gray-700 text-sm italic">{resume.personalInfo.declaration}</p>
        </section>
      )}
    </div>
  );
};

export default MinimalistTemplate;