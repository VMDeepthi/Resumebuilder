import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';

const ResumePreview: React.FC = () => {
  const { template } = useResume();

  const TemplateComponent = {
    modern: ModernTemplate,
    corporate: CorporateTemplate,
    minimalist: MinimalistTemplate,
  }[template];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-8">
        <TemplateComponent />
      </div>
    </div>
  );
};

export default ResumePreview;