import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashComp = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalSkills, setTotalSkills] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthContacts, setLastMonthContacts] = useState(0);
  const [lastMonthServices, setLastMonthServices] = useState(0);
  const [lastMonthSkills, setLastMonthSkills] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/contact/getcontact?limit=5');
        const data = await res.json();
        if (res.ok) {
          setContacts(data.contacts);
          setTotalContacts(data.totalContacts);
          setLastMonthContacts(data.lastMonthContacts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/service/getservices?limit=5');
        const data = await res.json();
        if (res.ok) {
          setServices(data.services);
          setTotalServices(data.totalServices);
          setLastMonthServices(data.lastMonthServices);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skill/getskills?limit=5');
        const data = await res.json();
        if (res.ok) {
          setSkills(data.skills);
          setTotalSkills(data.totalSkills);
          setLastMonthSkills(data.lastMonthSkills);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchContacts();
      fetchServices();
      fetchSkills();
    }
  }, [currentUser]);
  return (
    <div className='p-3 md:mx-auto'>
    <div className='flex-wrap flex gap-4 justify-center'>
      <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div className=''>
            <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
            <p className='text-2xl'>{totalUsers}</p>
          </div>
          <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
        </div>
        <div className='flex  gap-2 text-sm'>
          <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp />
            {lastMonthUsers}
          </span>
          <div className='text-gray-500'>Last month</div>
        </div>
      </div>
      <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div className=''>
            <h3 className='text-gray-500 text-md uppercase'>
              Total Contacts
            </h3>
            <p className='text-2xl'>{totalContacts}</p>
          </div>
          <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
        </div>
        <div className='flex  gap-2 text-sm'>
          <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp />
            {lastMonthContacts}
          </span>
          <div className='text-gray-500'>Last month</div>
        </div>
      </div>

      <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div className=''>
            <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
            <p className='text-2xl'>{totalPosts}</p>
          </div>
          <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
        </div>
        <div className='flex  gap-2 text-sm'>
          <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp />
            {lastMonthPosts}
          </span>
          <div className='text-gray-500'>Last month</div>
        </div>
      </div>

      <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div className=''>
            <h3 className='text-gray-500 text-md uppercase'>
              Total Services
            </h3>
            <p className='text-2xl'>{totalServices}</p>
          </div>
          <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
        </div>
        <div className='flex  gap-2 text-sm'>
          <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp />
            {lastMonthServices}
          </span>
          <div className='text-gray-500'>Last month</div>
        </div>
      </div>

      <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div className=''>
            <h3 className='text-gray-500 text-md uppercase'>
              Total Kills
            </h3>
            <p className='text-2xl'>{totalSkills}</p>
          </div>
          <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
        </div>
        <div className='flex  gap-2 text-sm'>
          <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp />
            {lastMonthSkills}
          </span>
          <div className='text-gray-500'>Last month</div>
        </div>
      </div>
    </div>

    <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
      <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
        <div className='flex justify-between  p-3 text-sm font-semibold'>
          <h1 className='text-center p-2'>Recent users</h1>
          <Button outline gradientDuoTone='purpleToPink'>
            <Link to={'/dashboard?tab=users'}>See all</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
          </Table.Head>
          {users &&
            users.map((user) => (
              <Table.Body key={user._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt='user'
                      className='w-10 h-10 rounded-full bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>
      <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
        <div className='flex justify-between  p-3 text-sm font-semibold'>
          <h1 className='text-center p-2'>Recent Contacts</h1>
          <Button outline gradientDuoTone='purpleToPink'>
            <Link to={'/dashboard?tab=contact'}>See all</Link>
          </Button>
        </div>
        <Table hoverable>

        <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
          </Table.Head>
          
          {contacts &&
            contacts.map((contact) => (
              <Table.Body key={contact._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='w-96'>
                      <p className='line-clamp-2'>{contact.name}</p>
                  </Table.Cell>
                  <Table.Cell className='w-96'>
                      <p className='line-clamp-2'>{contact.message}</p>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>
      <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
        <div className='flex justify-between  p-3 text-sm font-semibold'>
          <h1 className='text-center p-2'>Recent posts</h1>
          <Button outline gradientDuoTone='purpleToPink'>
            <Link to={'/dashboard?tab=posts'}>See all</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
          </Table.Head>
          {posts &&
            posts.map((post) => (
              <Table.Body key={post._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    <img
                      src={post.image}
                      alt='user'
                      className='w-14 h-10 rounded-md bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell className='w-96'>{post.title}</Table.Cell>
                  <Table.Cell className='w-5'>{post.category}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>

      <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
        <div className='flex justify-between  p-3 text-sm font-semibold'>
          <h1 className='text-center p-2'>Recent posts</h1>
          <Button outline gradientDuoTone='purpleToPink'>
            <Link to={'/dashboard?tab=services'}>See all</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Service image</Table.HeadCell>
            <Table.HeadCell>Title Title</Table.HeadCell>
          </Table.Head>
          {services &&
            services.map((service) => (
              <Table.Body key={service._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    <img
                      src={service.image}
                      alt='user'
                      className='w-14 h-10 rounded-md bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell className='w-96'>{service.serviceTitle}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>

      <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
        <div className='flex justify-between  p-3 text-sm font-semibold'>
          <h1 className='text-center p-2'>Recent Skills</h1>
          <Button outline gradientDuoTone='purpleToPink'>
            <Link to={'/dashboard?tab=skills'}>See all</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Skill image</Table.HeadCell>
            <Table.HeadCell>Technologies</Table.HeadCell>
            <Table.HeadCell>Percents</Table.HeadCell>
          </Table.Head>
          {skills &&
            skills.map((skill) => (
              <Table.Body key={skill._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    <img
                      src={skill.image}
                      alt='user'
                      className='w-14 h-10 rounded-md bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell className='w-96'>{skill.technology}</Table.Cell>
                  <Table.Cell className='w-5'>{skill.percent}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>

    </div>
  </div>
  )
}

export default DashComp