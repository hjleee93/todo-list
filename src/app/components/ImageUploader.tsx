
'use client';

import { useRef } from 'react';

type ImageUploaderProps = {
  onImageChange: (file: File, previewUrl: string) => void; // 이미지 변경 함수 -> 부모 전달
  children: React.ReactNode;
};

// 영문 포함 여부 확인
const isEnglishOnly = (filename: string) => /^[a-zA-Z0-9_.-]+$/.test(filename);

/**
 * 이미지 업로드 컴포넌트
 * @param onImageChange 이미지 변경 함수 -> 부모 전달
 * @param children 자식 요소
 * @returns 
 */
const ImageUploader = ({ onImageChange, children }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file && !isEnglishOnly(file.name)) {
      alert('영문 파일만 업로드 가능합니다.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('5MB 이하의 파일만 업로드 가능합니다.');
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onImageChange(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
    </>
  );
}

export default ImageUploader;
