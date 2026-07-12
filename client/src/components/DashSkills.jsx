import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Table } from 'flowbite-react';
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
  }, [currentUser._id])

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
        `/api/skill/deleteSkill/${skillIdToDelete}/${currentUser._id}`,
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
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <div className="w-full flex justify-end mt-2 mb-2">
      <Link to="/create-skill">
        <Button gradientDuoTone="purpleToPink">Add Skill</Button>
      </Link>
      </div>

      {currentUser.isAdmin && userSkills.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Skill image</Table.HeadCell>
              <Table.HeadCell>Technology</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Level</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {userSkills.map((skill) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(skill.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/`}>
                      <img
                        src={skill.image}
                        alt={skill.technology}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/`}
                    >
                      {skill.technology}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{skill.category}</Table.Cell>
                  <Table.Cell>{skill.percent}%</Table.Cell>
                  <Table.Cell>
                  <span
                      onClick={() => {
                        setShowModal(true);
                        setSkillIdToDelete(skill._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                Show more
              </button>
            )
          }
        </>
      ) : (
        <p>You have no skills yet!</p>
      )}
      
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this skill
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteSkill}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      
      
    </div>
  );
};

export default DashSkills;
