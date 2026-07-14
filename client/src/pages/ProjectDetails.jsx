import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { FaArrowLeft } from 'react-icons/fa6';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import { getCategoryLabel } from '../utils/projectCategories';

const ProjectDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch(`/api/post/getposts?slug=${slug}`);
        const data = await res.json();
        if (res.ok && data.posts.length > 0) {
          setPost(data.posts[0]);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.log(error.message);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (!post?.category) return;
    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `/api/post/getposts?category=${post.category}&limit=3`
        );
        const data = await res.json();
        if (res.ok) {
          setRelatedPosts(data.posts.filter((p) => p._id !== post._id));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRelated();
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-pink-500 animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20 px-4 text-center">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <p className="text-gray-500">
          This project may have been removed or the link is incorrect.
        </p>
        <Link
          to="/projects"
          className="mt-4 inline-flex items-center gap-2 py-3 px-6 font-bold rounded-[20px] bg-[#222] hover:bg-[#111] text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black shadow-lg transition-colors duration-300"
        >
          <FaArrowLeft /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-4xl mx-auto">
      <Reveal>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-pink-500 transition-colors duration-300 mb-6"
        >
          <FaArrowLeft className="text-xs" /> Back to Projects
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 sm:h-96 object-cover"
          />
          {post.category && (
            <span className="absolute top-4 left-4 rounded-full bg-black/80 dark:bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-white dark:text-black">
              {getCategoryLabel(post.category)}
            </span>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{post.title}</h1>
          <p className="mt-3 text-lg font-medium text-gray-500">
            {post.description}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Last updated {new Date(post.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </Reveal>

      <div className="h-px bg-gray-200 dark:bg-gray-800 my-8" />

      <Reveal delay={0.15}>
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Reveal>

      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">More in this category</h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {relatedPosts.map((related) => (
              <motion.div
                key={related._id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <ProjectCard post={related} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
