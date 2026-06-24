import React, { useState, useRef } from 'react';
import { Upload, Link, Trash2, FileImage, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  id: string;
}

export default function ImageUpload({ value, onChange, label, placeholder = 'https://...', id }: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadMode, setUploadMode] = useState<'local' | 'url'>(value.startsWith('data:image') || !value ? 'local' : 'url');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resize and compress image client-side to keep Base64 string small
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 900;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          // Compress as JPEG with 0.7 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (PNG, JPG, JPEG, WEBP, dll).');
      return;
    }

    // Limit to 8MB original file size to avoid browser crash
    if (file.size > 8 * 1024 * 1024) {
      setError('Ukuran file terlalu besar. Maksimal 8MB.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const base64Str = await compressImage(file);
      onChange(base64Str);
    } catch (err) {
      console.error('Error compressing image:', err);
      setError('Gagal membaca dan mengompresi gambar. Silakan coba file lain.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const clearImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2" id={`image-upload-wrapper-${id}`}>
      <div className="flex items-center justify-between">
        <label className="block text-slate-700 font-bold text-xs md:text-sm uppercase tracking-wider">{label}</label>
        
        {/* Toggle Mode */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg text-[10px] md:text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setUploadMode('local');
              setError(null);
            }}
            className={`px-2.5 py-1 rounded-md transition-all ${
              uploadMode === 'local' 
                ? 'bg-white text-desa-hijau shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Upload Lokal
          </button>
          <button
            type="button"
            onClick={() => {
              setUploadMode('url');
              setError(null);
            }}
            className={`px-2.5 py-1 rounded-md transition-all ${
              uploadMode === 'url' 
                ? 'bg-white text-desa-hijau shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Gunakan URL
          </button>
        </div>
      </div>

      {uploadMode === 'local' ? (
        <div className="relative">
          {value ? (
            /* Image Preview Mode */
            <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-2 group" id={`preview-${id}`}>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center relative">
                <img 
                  src={value} 
                  alt="Preview unggahan" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Action Buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 bg-white hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md transition-transform active:scale-95"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Ganti
                  </button>
                  <button
                    type="button"
                    onClick={clearImage}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-md transition-transform active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                  </button>
                </div>
              </div>

              {/* Status info bar */}
              <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500 font-mono">
                <span className="truncate max-w-[200px]">
                  {value.startsWith('data:image') ? '✓ Gambar lokal (Terkompresi)' : '✓ Gambar dari URL'}
                </span>
                <button
                  type="button"
                  onClick={clearImage}
                  className="text-red-500 hover:text-red-700 font-bold flex items-center gap-0.5"
                >
                  Hapus
                </button>
              </div>
            </div>
          ) : (
            /* Drag & Drop Upload Zone */
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 ${
                isDragActive 
                  ? 'border-desa-hijau bg-desa-hijau-soft/30 scale-[0.99]' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              id={`dropzone-${id}`}
            >
              {isLoading ? (
                <div className="py-4 space-y-2 flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-desa-hijau animate-spin" />
                  <p className="text-xs font-bold text-slate-600">Sedang mengompresi gambar...</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="w-10 h-10 bg-white border border-slate-150 rounded-full shadow-sm flex items-center justify-center mx-auto text-slate-400 group-hover:text-desa-hijau transition-colors">
                    <FileImage className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">
                      Tarik & lepas gambar ke sini, atau <span className="text-desa-hijau underline">pilih file</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Mendukung PNG, JPG, JPEG, WEBP. Maksimal file 8MB.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id={`file-input-${id}`}
          />
        </div>
      ) : (
        /* Manual URL Entry Mode */
        <div className="relative" id={`url-input-container-${id}`}>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-slate-400">
              <Link className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-9 pr-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-desa-hijau text-xs md:text-sm"
              id={id}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
            Tempel tautan gambar eksternal (Unsplash, imgur, atau web instansi terkait).
          </p>
        </div>
      )}

      {error && (
        <p className="text-[10px] md:text-xs font-bold text-red-600 animate-pulse mt-1" id={`error-${id}`}>
          {error}
        </p>
      )}
    </div>
  );
}
