import React, { useState, useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import ProjectsForm from './forms/ProjectsForm';
import SkillsForm from './forms/SkillsForm';
import ResumePreview from './preview/ResumePreview';
import { Download, Wand2 } from 'lucide-react';
import { generateSummary } from '../services/gemini';

const ResumeBuilder = () => {
  const { resume, updateResume, template, setTemplate } = useResume();
  const [activeTab, setActiveTab] = useState('personal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef(null);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const experience = resume.experience
        .map(exp => `${exp.position} at ${exp.company}: ${exp.description}`)
        .join('\n');
      
      const summary = await generateSummary(experience, resume.skills);
      
      updateResume({
        ...resume,
        personalInfo: {
          ...resume.personalInfo,
          summary,
        },
      });
    } catch (error) {
      console.error('Error generating summary:', error);
    }
    setIsGenerating(false);
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
  
    setIsDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = previewRef.current;
      const fileName = resume.personalInfo?.fullName 
        ? `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_resume.pdf`
        : 'resume.pdf';
  
      const opt = {
        margin: 1,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
  
      await html2pdf().set(opt).from(element).save();
  
      // Reset resume state and clear localStorage
      updateResume({
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
      });
  
      localStorage.removeItem('resume'); // Clear local storage
  
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setIsDownloading(false);
  };
  
  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
  ];

  const templates = [
    { id: 'modern', label: 'Modern' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'minimalist', label: 'Minimalist' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'personal' && (
            <>
              <PersonalInfoForm />
              <button
                onClick={handleGenerateSummary}
                disabled={isGenerating}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate Summary with AI'}
              </button>
            </>
          )}
          {activeTab === 'experience' && <ExperienceForm />}
          {activeTab === 'education' && <EducationForm />}
          {activeTab === 'projects' && <ProjectsForm />}
          {activeTab === 'skills' && <SkillsForm />}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-lg font-medium mb-2">Template Style</h3>
          <div className="flex space-x-4">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  template === t.id
                    ? 'bg-indigo-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Preview</h2>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </button>
          </div>
          <div ref={previewRef}>
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
