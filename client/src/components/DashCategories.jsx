import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import { HiOutlineExclamationCircle, HiPlus, HiTrash } from 'react-icons/hi';
import { motion } from 'motion/react';
import { getCategoryLabel } from '../utils/projectCategories';

const CategoryColumn = ({ title, type, formatLabel }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const inputRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/category/getcategories?type=${type}`);
      const data = await res.json();
      if (res.ok) setCategories(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleAdd = async () => {
    if (!newName.trim()) {
      setError('Please enter a category name first');
      inputRef.current?.focus();
      return;
    }
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
      setNewName('');
      setCategories((prev) => {
        const exists = prev.some((c) => c._id === data._id);
        return exists ? prev : [...prev, data].sort((a, b) => a.name.localeCompare(b.name));
      });
    } catch (err) {
      setError('Something went wrong');
      console.log(err.message);
    }
  };

  const handleDelete = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/category/deletecategory/${categoryToDelete}/${currentUser._id}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c._id !== categoryToDelete));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="text-xs font-bold uppercase tracking-wide text-gray-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-500 rounded-full px-2.5 py-1">
          {categories.length}
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        <TextInput
          ref={inputRef}
          className="flex-1"
          placeholder="New category name"
          value={newName}
          color={error ? 'failure' : undefined}
          onChange={(e) => {
            setNewName(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button type="button" color="purple" onClick={handleAdd}>
          <HiPlus />
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {categories.length === 0 ? (
        <p className="text-sm text-gray-500">No categories yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="group flex items-center justify-between rounded-xl border border-gray-100 dark:border-gray-800 px-4 py-2.5 hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-200"
            >
              <span className="text-sm font-semibold">
                {formatLabel ? formatLabel(category.name) : category.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  setCategoryToDelete(category._id);
                  setShowModal(true);
                }}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity duration-200"
              >
                <HiTrash />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Delete this category? Existing items keep their old value.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, delete it
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

const DashCategories = () => {
  return (
    <div className="p-3 md:p-6 max-w-5xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-sm text-gray-500">
          Manage the categories used as tabs on Projects and Skills.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <CategoryColumn title="Project Categories" type="project" formatLabel={getCategoryLabel} />
        <CategoryColumn title="Skill Categories" type="skill" />
      </div>
    </div>
  );
};

export default DashCategories;
