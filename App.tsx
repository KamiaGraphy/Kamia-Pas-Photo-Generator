import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import ImageDisplay from './components/ImageDisplay';
import PreviewModal from './components/PreviewModal';
import { PhotoConfig } from './types';
import { PHOTO_SIZES, BACKGROUND_COLORS, EXPRESSIONS, LIGHTING_OPTIONS } from './constants';
import { generatePasPhoto } from './services/geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<PhotoConfig>({
    size: PHOTO_SIZES[1].value,
    backgroundColor: BACKGROUND_COLORS[1].value,
    outfit: 'Kemeja putih dan jas hitam',
    expression: EXPRESSIONS[0].value,
    lighting: LIGHTING_OPTIONS[0].value,
  });
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [outfitReferenceFile, setOutfitReferenceFile] = useState<File | null>(null);
  const [outfitReferencePreview, setOutfitReferencePreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve({ base64, mimeType: file.type });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = (file: File) => {
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImagePreview(reader.result as string);
      setGeneratedImage(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setUploadedFile(null);
    setUploadedImagePreview(null);
    setGeneratedImage(null);
    setError(null);
  };
  
  const handleOutfitReferenceUpload = (file: File) => {
    setOutfitReferenceFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOutfitReferencePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleClearOutfitReference = () => {
    setOutfitReferenceFile(null);
    setOutfitReferencePreview(null);
  };
  
  const handleLogoUpload = (file: File) => {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClearLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handlePreviewOpen = () => {
    if (generatedImage) {
      setIsPreviewOpen(true);
    }
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
  };

  const handleGenerate = useCallback(async () => {
    if (!uploadedFile) {
        setError("Silakan unggah foto terlebih dahulu.");
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const mainImageData = await fileToBase64(uploadedFile);
      let outfitImageData: { base64: string; mimeType: string } | undefined = undefined;
      let logoImageData: { base64: string; mimeType: string } | undefined = undefined;
      
      if (outfitReferenceFile) {
        outfitImageData = await fileToBase64(outfitReferenceFile);
      }
      
      if (logoFile) {
        logoImageData = await fileToBase64(logoFile);
      }
      
      const imageResult = await generatePasPhoto(config, mainImageData, outfitImageData, logoImageData);
      setGeneratedImage(imageResult);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [config, uploadedFile, outfitReferenceFile, logoFile]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ControlPanel
              config={config}
              setConfig={setConfig}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              onImageUpload={handleImageUpload}
              uploadedFile={uploadedFile}
              onClearImage={handleClearImage}
              onOutfitReferenceUpload={handleOutfitReferenceUpload}
              outfitReferenceFile={outfitReferenceFile}
              outfitReferencePreview={outfitReferencePreview}
              onClearOutfitReference={handleClearOutfitReference}
              onLogoUpload={handleLogoUpload}
              logoFile={logoFile}
              logoPreview={logoPreview}
              onClearLogo={handleClearLogo}
            />
          </div>
          <div className="lg:col-span-2">
            <ImageDisplay
              image={generatedImage}
              isLoading={isLoading}
              error={error}
              uploadedImagePreview={uploadedImagePreview}
              onPreview={handlePreviewOpen}
            />
          </div>
        </main>
        <footer className="text-center text-gray-500 mt-12 py-4">
          <p>&copy; {new Date().getFullYear()} Kamia Pas Photo Generator. Didukung oleh AI.</p>
        </footer>
      </div>
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={handlePreviewClose}
        imageSrc={generatedImage}
      />
    </div>
  );
};

export default App;