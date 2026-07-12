import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin,FaDiscord } from "react-icons/fa";
import { motion } from "motion/react";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields");
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        return setError(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen pt-20 mt-20 overflow-hidden">
      <div className="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* leftside */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <span className="text-xl text-gray-500 block mb-1">Hello, I Am</span>
          <Link
            to="/"
            className="font-bold dark:text-white text-4xl transition-all duration-500 hover:bg-clip-text hover:text-transparent hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-600"
          >
            Abdul Rahman
          </Link>
          <p className="text-sm mt-5 font-medium text-gray-500">
            I&apos;m a creative web designer based in Maharastra India, and i&apos;m very
            passionate and dedicated to my work.
          </p>
          <div className="mt-8 flex justify-start text-3xl gap-6 dark:text-white">
            {[FaGithub, FaLinkedin, FaDiscord].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.25, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                className="inline-block hover:text-pink-500 transition-colors"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
        {/* rightside */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-1"
        >
          <div className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-[border-color,box-shadow] duration-500">
            <form onSubmit={handleSubmit}>
              <div>
                <Label value="Your Name" />
                <TextInput
                  type="text"
                  placeholder="Your Name"
                  id="name"
                  // required={true}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <Label value="Abdul" />
                <TextInput
                  type="text"
                  placeholder="abdul001"
                  id="username"
                  // required={true}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <Label value="Your Email" />
                <TextInput
                  type="email"
                  placeholder="abdul123@portfolio.com"
                  id="email"
                  // required={true}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <Label value="Your Password" />
                <TextInput
                  type="password"
                  placeholder="********"
                  id="password"
                  // required={true}
                  onChange={handleChange}
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="w-full mt-5"
                  color='pink'
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                    <Spinner size='sm' />
                    <span className="pl-3">Loading...</span>
                    </>
                  ) : "Sign Up"}
                </Button>
              </motion.div>
              <OAuth />
            </form>

            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account? </span>
              <Link
                to="/sign-in"
                className="relative text-blue-500 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Sign In
              </Link>
            </div>
            {
              error && (
                <Alert className="mt-5" color='failure'>{error}</Alert>
              )
            }
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
