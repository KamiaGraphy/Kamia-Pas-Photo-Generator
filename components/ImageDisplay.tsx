import React from 'react';

interface ImageDisplayProps {
  image: string | null;
  isLoading: boolean;
  error: string | null;
  uploadedImagePreview: string | null;
  onPreview: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isLoading, error, uploadedImagePreview, onPreview }) => {
  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'kamia-pas-photo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-8">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
      <h3 className="text-xl font-semibold">Hasil Editan Foto Akan Muncul di Sini</h3>
      <p className="mt-2 max-w-sm">
        Unggah foto Anda di panel sebelah kiri untuk memulai proses editing.
      </p>
    </div>
  );
  
  const Loader = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-300 p-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
      <h3 className="text-xl font-semibold mt-6">AI sedang bekerja...</h3>
      <p className="mt-2 max-w-sm">
        Harap tunggu sejenak, foto Anda sedang disempurnakan.
      </p>
    </div>
  );
  
  const ErrorDisplay = () => (
     <div className="flex flex-col items-center justify-center h-full text-center text-red-400 p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold">Oops! Terjadi Kesalahan</h3>
        <p className="mt-2 max-w-md bg-gray-800 p-3 rounded-md text-sm">{error}</p>
    </div>
  );

  const UploadedPreview = () => (
    <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Foto yang akan diedit</h3>
        <img src={uploadedImagePreview!} alt="Uploaded Preview" className="max-w-full max-h-[60vh] lg:max-h-[70vh] rounded-lg shadow-2xl mx-auto" />
        <p className="text-sm text-gray-400 mt-4">Sesuaikan opsi dan klik "Edit Pas Photo" untuk melanjutkan.</p>
    </div>
  );
  
  const ComparisonView = () => (
    <div className="p-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Before</h3>
          <img src={uploadedImagePreview!} alt="Original" className="w-full h-auto object-contain max-h-[60vh] rounded-lg shadow-lg mx-auto" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">After</h3>
          <div
            onClick={onPreview}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
            title="Klik untuk melihat pratinjau"
          >
            <img src={image!} alt="Generated" className="w-full h-auto object-contain max-h-[60vh] rounded-lg mx-auto transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <button 
          onClick={handleDownload}
          className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.086V3a1 1 0 112 0v8.086l1.293-1.379a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span>Unduh Foto Hasil Edit</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 flex items-center justify-center min-h-[400px] lg:min-h-full">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorDisplay />
      ) : image ? (
        <ComparisonView />
      ) : uploadedImagePreview ? (
        <UploadedPreview />
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export default ImageDisplay;