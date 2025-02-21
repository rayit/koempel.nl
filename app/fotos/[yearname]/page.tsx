'use client'
import FolderList, { FolderData } from "@/components/FolderList";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from '@/lib/axiosInstance';

export default function PhotoPage() {
  const pathname = usePathname();

  const [foldersData, setFoldersData] = useState<FolderData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGalleryYears() {
      try {
        const response = await api.get('/api/folders');
        if (response.data) {
          const folder = response.data.find((folder: FolderData) => `/fotos/${folder.order}` === pathname);
          if (folder) {
            setFoldersData(folder.subfolders);
          } else {
            setError('No folders found');
          }
        } else {
          setError('No folders found');
        }
      } catch (error) {
        console.error('Error fetching gallery years:', error);
        setError('Failed to fetch gallery data');
      }
    }
    fetchGalleryYears();
  }, [pathname]);

  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Foto Galerij</h1>
            <FolderList foldersData={foldersData} />
          </div>
        </main>
      </div>
  );
}