import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashSkills = () => {
  const {currentUser} = useSelector((state) => state.user);
  const [userSkills, setUserSkills] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [skillIdToDelete, setSkillIdToDelete] = useState('')

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`/api/skill/getskills?userId=${currentUser._id}`)
        const data = await res.json();
        if(res.ok){
          setUserSkills(data.skills);
          if(data.skills.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if(currentUser.isAdmin){
      fetchSkills();
    }
  }, [currentUser._id, currentUser.isAdmin])

  const handleShowMore = async () => {
    const startIndex = userSkills.length;
    try {
      const res = await fetch(`/api/skill/getskills?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserSkills((prev) => [...prev, ...data.skills]);
        if(data.skills.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
        console.log(error.message);
      }

  }

  const handleDeleteSkill = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/skill/deleteskill/${skillIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserSkills((prev) =>
          prev.filter((skill) => skill._id !== skillIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='p-3 md:p-6 max-w-6xl mx-auto w-full'>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-sm text-gray-500">{userSkills.length} total</p>
        </div>
        <Link to="/create-skill">
          <Button color='purple'>Add Skill</Button>
        </Link>
      </div>

      {currentUser.isAdmin && userSkills.length > 0 ? (
        <>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-x-auto">
          <Table hoverable className='min-w-max'>
            <TableHead>
              <TableRow>
                <TableHeadCell>Date updated</TableHeadCell>
                <TableHeadCell>Skill image</TableHeadCell>
                <TableHeadCell>Technology</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableRow>
            </TableHead>
            {userSkills.map((skill) => (
              <TableBody className='divide-y' key={skill._id}>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>
                    {new Date(skill.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/`}>
                      <img
                        src={skill.image}
                        alt={skill.technology}
                        className='w-20 h-10 object-cover rounded-lg bg-gray-200 dark:bg-gray-700'
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/`}
                    >
                      {skill.technology}
                    </Link>
                  </TableCell>
                  <TableCell>{skill.category}</TableCell>
                  <TableCell>
                  <span
                      onClick={() => {
                        setShowModal(true);
                        setSkillIdToDelete(skill._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          </div>
          {
            showMore && (
              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                Show more
              </button>
            )
          }
        </>
      ) : (
        <p className="text-gray-500">You have no skills yet!</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this skill
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteSkill}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      
      
    </div>
  );
};

export default DashSkills;
