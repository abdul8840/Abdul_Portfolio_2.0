import { Button, FileInput, TextInput, Alert } from 'flowbite-react'
import { useState } from 'react'
import { uploadImage } from '../utils/uploadImage';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from 'react-router-dom';
import CategoryPicker from '../components/CategoryPicker';


const CreateSkill = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const downloadURL = await uploadImage(file, (progress) => {
        setImageUploadProgress(progress);
      });
      setImageUploadProgress(null);
      setImageUploadError(null);
      setFormData({ ...formData, image: downloadURL });
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/skill/createskill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message)
        return;
      }
      if (res.ok) {
        setPublishError(null)
        navigate('/dashboard?tab=skills');

      }
    } catch (error) {
      setPublishError('Somethin went wrong!')
      console.log(error);
    }
  }
  return (
    <div className='p-3 pt-20 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create Skill</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput 
            id="technology"
            type="text"
            placeholder="Add Technology"
            required={true}
            className="flex-1"
            onChange={(e) => 
              setFormData({ ...formData, technology: e.target.value })
            }
          />
          <CategoryPicker
            type="skill"
            value={formData.category}
            onChange={(category) => setFormData({ ...formData, category })}
          />
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button 
            type='button' 
            color='blue' 
            size='sm' 
            outline 
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
            >
          {
            imageUploadProgress ? 
            <div className="w-16 h-16">
              <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
            </div>
            : 'Upload Image'
          }
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )
        }

        <Button type='submit' color='purple'>
          Add Skill
        </Button>
        {
          publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
        }
      </form>
    </div>
  )
}

export default CreateSkill