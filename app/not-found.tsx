import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Vehicle Not Found</h2>
        <p className="text-gray-600 mb-8">The vehicle you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-toyota-red text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Search
        </Link>
      </div>
    </div>
  );
}

