import React from 'react';
import { PhotoConfig, OptionType, ColorOptionType } from '../types';
import { PHOTO_SIZES, BACKGROUND_COLORS, EXPRESSIONS, LIGHTING_OPTIONS, OUTFIT_OPTIONS } from '../constants';

interface ControlPanelProps {
  config: PhotoConfig;
  setConfig: React.Dispatch<React.SetStateAction<PhotoConfig>>;
  onGenerate: () => void;
  isLoading: boolean;
  onImageUpload: (file: File) => void;
  uploadedFile: File | null;
  onClearImage: () => void;
  onOutfitReferenceUpload: (file: File) => void;
  outfitReferenceFile: File | null;
  outfitReferencePreview: string | null;
  onClearOutfitReference: () => void;
  onLogoUpload: (file: File) => void;
  logoFile: File | null;
  logoPreview: string | null;
  onClearLogo: () => void;
}

const ControlOption: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-300 mb-3">{title}</h3>
    {children}
  </div>
);

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  config, 
  setConfig, 
  onGenerate, 
  isLoading, 
  onImageUpload, 
  uploadedFile, 
  onClearImage,
  onOutfitReferenceUpload,
  outfitReferenceFile,
  outfitReferencePreview,
  onClearOutfitReference,
  onLogoUpload,
  logoFile,
  logoPreview,
  onClearLogo
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const outfitFileInputRef = React.useRef<HTMLInputElement>(null);
  const logoFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleConfigChange = <K extends keyof PhotoConfig,>(key: K, value: PhotoConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };
  
  const handleOutfitFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onOutfitReferenceUpload(event.target.files[0]);
    }
  };

  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onLogoUpload(event.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const triggerOutfitFileSelect = () => {
    outfitFileInputRef.current?.click();
  };

  const triggerLogoFileSelect = () => {
    logoFileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 h-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Kustomisasi Foto Anda</h2>
      
      <ControlOption title="1. Unggah Foto Anda">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        {!uploadedFile ? (
          <button
            onClick={triggerFileSelect}
            className="w-full border-2 border-dashed border-gray-600 rounded-lg p-6 text-center text-gray-400 hover:bg-gray-700/50 hover:border-purple-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="mt-2 block text-sm font-semibold">Pilih file untuk diunggah</span>
          </button>
        ) : (
          <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
            <p className="text-sm text-gray-300 truncate w-full mr-2">{uploadedFile.name}</p>
            <button onClick={onClearImage} title="Hapus foto" className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </ControlOption>
      
      <ControlOption title="2. Ukuran Pas Photo">
        <div className="grid grid-cols-2 gap-2">
          {PHOTO_SIZES.map((size: OptionType) => (
            <button
              key={size.value}
              onClick={() => handleConfigChange('size', size.value)}
              className={`p-2 rounded-lg text-sm text-center transition-all duration-200 ${
                config.size === size.value ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </ControlOption>

      <ControlOption title="3. Warna Latar Belakang">
        <div className="flex items-center space-x-3">
          {BACKGROUND_COLORS.map((color: ColorOptionType) => (
            <button
              key={color.value}
              title={color.label}
              onClick={() => handleConfigChange('backgroundColor', color.value)}
              className={`w-10 h-10 rounded-full transition-all duration-200 ${color.className} ${
                config.backgroundColor === color.value ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-purple-500' : ''
              }`}
            />
          ))}
        </div>
      </ControlOption>

      <ControlOption title="4. Pilihan Outfit">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
          {OUTFIT_OPTIONS.map((outfit: OptionType) => (
            <button
              key={outfit.value}
              onClick={() => handleConfigChange('outfit', outfit.value)}
              className={`p-2 rounded-lg text-xs md:text-sm text-center transition-all duration-200 ${
                config.outfit === outfit.value ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {outfit.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-center text-gray-400 mb-3">Atau ketik deskripsi custom & unggah referensi di bawah ini.</p>
        <input
          type="text"
          value={config.outfit}
          onChange={(e) => handleConfigChange('outfit', e.target.value)}
          placeholder="e.g., Kemeja putih dan jas hitam"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
        />
        <div className="mt-3">
            <input
              type="file"
              ref={outfitFileInputRef}
              onChange={handleOutfitFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
            {!outfitReferenceFile ? (
              <button
                onClick={triggerOutfitFileSelect}
                className="w-full text-sm border border-gray-600 rounded-lg p-2 text-center text-gray-400 hover:bg-gray-700/50 hover:border-purple-500 transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Unggah Gambar Referensi (Opsional)</span>
              </button>
            ) : (
              <div className="bg-gray-700 p-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                    <img src={outfitReferencePreview!} alt="Outfit preview" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                    <p className="text-sm text-gray-300 truncate">{outfitReferenceFile.name}</p>
                </div>
                <button onClick={onClearOutfitReference} title="Hapus referensi" className="text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
        </div>
        <div className="mt-3">
            <input
              type="file"
              ref={logoFileInputRef}
              onChange={handleLogoFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
            {!logoFile ? (
              <button
                onClick={triggerLogoFileSelect}
                className="w-full text-sm border border-gray-600 rounded-lg p-2 text-center text-gray-400 hover:bg-gray-700/50 hover:border-purple-500 transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Unggah Logo (Opsional)</span>
              </button>
            ) : (
              <div className="bg-gray-700 p-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                    <img src={logoPreview!} alt="Logo preview" className="w-10 h-10 rounded object-contain bg-white p-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300 truncate">{logoFile.name}</p>
                </div>
                <button onClick={onClearLogo} title="Hapus logo" className="text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
        </div>
      </ControlOption>

      <ControlOption title="5. Pilihan Ekspresi">
        <div className="flex flex-col space-y-2">
          {EXPRESSIONS.map((exp: OptionType) => (
            <label key={exp.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="expression"
                value={exp.value}
                checked={config.expression === exp.value}
                onChange={() => handleConfigChange('expression', exp.value)}
                className="form-radio h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
              />
              <span className="text-gray-300">{exp.label}</span>
            </label>
          ))}
        </div>
      </ControlOption>
      
      <ControlOption title="6. Pilihan Pencahayaan">
        <div className="flex flex-col space-y-2">
          {LIGHTING_OPTIONS.map((light: OptionType) => (
            <label key={light.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="lighting"
                value={light.value}
                checked={config.lighting === light.value}
                onChange={() => handleConfigChange('lighting', light.value)}
                className="form-radio h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
              />
              <span className="text-gray-300">{light.label}</span>
            </label>
          ))}
        </div>
      </ControlOption>

      <button
        onClick={onGenerate}
        disabled={isLoading || !uploadedFile}
        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
          </svg>
        )}
        <span>{isLoading ? 'Mengedit Foto...' : 'Edit Pas Photo'}</span>
      </button>
    </div>
  );
};

export default ControlPanel;