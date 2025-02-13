import React, { createContext, useContext, useEffect, useState } from 'react';
import { Resume, Template } from '../types/resume';

interface ResumeContextType {
  resume: Resume;
  updateResume: (newResume: Resume) => void;
  template: Template;
  setTemplate: (template: Template) => void;
}

const defaultResume: Resume = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    declaration: 'I hereby declare that all the information provided above is true to the best of my knowledge.',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<Resume>(() => {
    const saved = localStorage.getItem('resume');
    return saved ? JSON.parse(saved) : defaultResume;
  });
  const [template, setTemplate] = useState<Template>('modern');

  useEffect(() => {
    localStorage.setItem('resume', JSON.stringify(resume));
  }, [resume]);

  const updateResume = (newResume: Resume) => {
    setResume(newResume);
  };

  return (
    <ResumeContext.Provider value={{ resume, updateResume, template, setTemplate }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};