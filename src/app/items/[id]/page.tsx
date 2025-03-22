'use client'

import Button from "@/app/components/Button";
import ImageUploader from "@/app/components/ImageUploader";
import RadioButton from "@/app/components/Todo/RadioButton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL!


const ItemPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const inputImageRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  

  const { data, isLoading, isError } = useQuery({
    queryKey: ['todoItem', id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/items/${id}`)
      return res.json()
    },
  })

  if (isLoading) {
    return <p>로딩 중...</p>
  }

  if (isError) {
    return <p>에러가 발생했습니다</p>
  }


  const handleImageChange = (file: File, previewUrl: string) => {
    setPreview(previewUrl);
    setImageFile(file);
  };

  /**
   * 이미지 업로드
   * 용량 5MB 이하
   * 영문 파일만 업로드 가능
   */
  const handleAddImage = async (file: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_URL}/images/upload`, {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) {
      alert('이미지 업로드 실패')
      throw new Error("이미지 업로드 실패");
    }
    return res.json()
  }

  const handleDelete = async () => {
    const res = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      alert('삭제되었습니다.')
      router.push('/')
    }

  }

  /**
   * 할 일 수정
   * 이름, 메모 수정
   * 이미지 파일 있는 경우 이미지 업로드 후 업로드 된 이미지 주소 저장
   */
  const handleUpdate = async () => {
    let imageUrl = data.imageUrl
    if (imageFile) {
      const res: {url: string} = await handleAddImage(imageFile);
      imageUrl = res.url
    }

    const name = nameRef.current?.value ?? data.name
    const memo = textAreaRef.current?.value ?? data.memo
    const res = await fetch(`${API_URL}/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name || data.name,
        memo,
        imageUrl,
      }),
    })
    if (res.ok) {
      alert('수정되었습니다.')
    }
  }

  return (
    <div className="page-container flex-col px-5 bg-white h-[calc(100vh-60px)] gap-5 md:px-30">
      <RadioButton
        classNames={{
          wrapper: "rounded-[24px] h-[64px] flex justify-center text-xl",
          inputContainer: "justify-center max-w-full ",
                }}
        isEditing={true}
        todo={data}
        ref={nameRef}
         />
      <div className="flex flex-col gap-5 md:flex-row">
        
        {(preview || data.imageUrl) ? (
          <ImageUploader onImageChange={handleImageChange}>
        <div className="relative w-full md:w-[384px] h-[311px] rounded-3xl">
          <img
            src={preview || data.imageUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded-3xl md:min-w-[384px] min-h-[311px]"
          />
           <button className="absolute bottom-3 right-3 bg-slate-900/50 border-2 rounded-full p-1 w-[64px] h-[64px] flex items-center justify-center cursor-pointer">
        <Image
          src="/icons/edit.svg"
            alt="사진 수정 아이콘"
            width={18}
          height={18}
        />
      </button>
        </div>
        </ImageUploader>
      )
      :
      <ImageUploader onImageChange={handleImageChange}>
      <div className="relative w-full md:w-[384px] h-[311px] rounded-3xl flex items-center justify-center bg-slate-50 border-dashed border-2 border-slate-300 cursor-pointer"
      onClick={() => inputImageRef.current?.click()}
    >
      <Image
        src="/images/img.png"
        alt="사진 추가 아이콘"
        width={64}
        height={64}
      />
      <button className="absolute bottom-3 right-3 bg-slate-200 rounded-full p-1 w-[64px] h-[64px] flex items-center justify-center">
        <Image
          src="/icons/plus_large.svg"
          alt="사진 추가 아이콘"
          width={18}
          height={18}
        />
      </button>
    </div>
    </ImageUploader>
    }
        
        
        <div className="bg-[url('/images/memo.png')] bg-cover bg-center w-full md:w-[588px] h-[311px] rounded-3xl flex flex-col p-5">
          <p className="text-amber-800 text-bold text-center mt-3">Memo</p>
          <textarea
            defaultValue={data.memo}
            ref={textAreaRef}
            className="w-full h-full rounded resize-none bg-opacity-80 text-gray-800 placeholder-gray-500 focus:outline-none"
            placeholder="메모를 입력하세요"
          />
        </div>
      </div>
      <div className="flex gap-3 justify-center md:justify-end">
        <Button
          iconType="check"
          className="bg-slate-200 w-full"
          onClick={handleUpdate}
          isTextHidden={false}
        >
          수정완료
        </Button>
        <Button
          iconType="X"
          className="bg-rose-500 text-white w-full"
          onClick={handleDelete}
          isTextHidden={false}
        >
          삭제하기
        </Button>
      </div>
    </div>
  )
}

export default ItemPage