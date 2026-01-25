import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (blobUrl: string) => {
  if (!blobUrl) return null;

  try {
    // 1. blob 주소에서 실제 데이터(blob)를 가져옴
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    // 2. 저장 경로 설정 (예: quizzes/날짜_파일명)
    const storage = getStorage();
    const storageRef = ref(storage, `requested/${Date.now()}`);

    // 3. 업로드
    const snapshot = await uploadBytes(storageRef, blob);
    
    // 4. 업로드된 파일의 진짜 URL 가져오기
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};