import { useEffect, useState } from 'react';
import { Button, Select, TextInput } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';

const CategoryPicker = ({ type, value, onChange, className = '', formatLabel }) => {
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/category/getcategories?type=${type}`);
        const data = await res.json();
        if (res.ok) {
          setCategories(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();
  }, [type]);

  const handleAddCategory = async () => {
    if (!newName.trim()) return;
    try {
      const res = await fetch('/api/category/createcategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim(), type }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      setError(null);
      setCategories((prev) => {
        const exists = prev.some((c) => c._id === data._id);
        return exists ? prev : [...prev, data].sort((a, b) => a.name.localeCompare(b.name));
      });
      onChange(data.name);
      setNewName('');
      setIsAdding(false);
    } catch (err) {
      setError('Something went wrong');
      console.log(err.message);
    }
  };

  return (
    <div className={`flex-1 ${className}`}>
      {isAdding ? (
        <div className="flex gap-2">
          <TextInput
            className="flex-1"
            placeholder="New category name"
            value={newName}
            autoFocus
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCategory();
              }
            }}
          />
          <Button type="button" color="purple" onClick={handleAddCategory}>
            Add
          </Button>
          <Button
            type="button"
            color="gray"
            onClick={() => {
              setIsAdding(false);
              setNewName('');
              setError(null);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Select
            className="flex-1"
            value={value || 'uncategorized'}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="uncategorized">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {formatLabel ? formatLabel(category.name) : category.name}
              </option>
            ))}
          </Select>
          <Button type="button" color="gray" onClick={() => setIsAdding(true)}>
            <HiPlus />
          </Button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CategoryPicker;
