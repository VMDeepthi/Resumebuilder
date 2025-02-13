import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import ResumeBuilder from './components/ResumeBuilder';
import { FileText } from 'lucide-react';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-center space-x-2">
  <FileText className="h-8 w-8 text-indigo-600" />
  <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
</div>

        </header>
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <ResumeBuilder />
        </main>
      </div>
    </ResumeProvider>
  );
}

export default App;