import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';

const CorporateTemplate: React.FC = () => {
  const { resume } = useResume();

  return (
    <div className="max-w-4xl mx-auto font-serif">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
          {resume.personalInfo.fullName}
        </h1>
        <h2 className="text-xl text-gray-600 mt-1">{resume.personalInfo.title}</h2>
        
        <div className="flex justify-center gap-6 mt-4 text-gray-600">
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
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Professional Experience
          </h3>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <div className="text-gray-600">{exp.company}</div>
                  </div>
                  <div className="text-gray-600 italic">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Education
          </h3>
          <div className="space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                    <div className="text-gray-600">{edu.school}</div>
                    <div className="text-gray-600">{edu.fieldOfStudy}</div>
                  </div>
                  <div className="text-gray-600 italic">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.projects.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Projects
          </h3>
          <div className="space-y-6">
            {resume.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-gray-900">{project.name}</h4>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                      <LinkIcon className="h-4 w-4 mr-1" />
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-gray-700">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="mt-2">
                    <span className="font-bold text-gray-700">Technologies:</span>{' '}
                    {project.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Skills
          </h3>
          <div className="flex flex-wrap gap-4">
            {resume.skills.map((skill, index) => (
              <span key={index} className="text-gray-700">
                {skill}
                {index < resume.skills.length - 1 && ' •'}
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.personalInfo.declaration && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">
            Declaration
          </h3>
          <p className="text-gray-700 italic">{resume.personalInfo.declaration}</p>
        </section>
      )}
    </div>
  );
};

export default CorporateTemplate;