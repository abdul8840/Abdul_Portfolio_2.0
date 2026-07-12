export function uploadImage(file, onProgress) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('image', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');
    xhr.withCredentials = true;

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      let data;
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        reject(new Error('Image upload failed'));
        return;
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data.url);
      } else {
        reject(new Error(data.message || 'Image upload failed'));
      }
    };

    xhr.onerror = () => reject(new Error('Image upload failed'));

    xhr.send(formData);
  });
}
