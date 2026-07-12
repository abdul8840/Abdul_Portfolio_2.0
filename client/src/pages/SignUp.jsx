import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin,FaDiscord } from "react-icons/fa";
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

  console.log(formData)
  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* leftside */}
        <div className="flex-1">
          <span className="text-xl text-gray-500 block mb-1">Hello, I Am</span>
          <Link to="/" className="font-bold dark:text-white text-4xl">
            Abdul Rahman
          </Link>
          <p className="text-sm mt-5 font-[500] text-gray-500">
            I'm a creative web designer based in Maharastra India, and i'm very
            passionate and dedicated to my work.
          </p>
          <div className="mt-8 flex justify-start text-3xl gap-6 dark:text-white">
          <Link to=''><FaGithub /></Link>
          <Link to=''><FaLinkedin /></Link>
          <Link to=''><FaDiscord /></Link>
          </div>
        </div>
        {/* rightside */}
        <div className="flex-1">
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
            <Button
              className="w-full mt-5"
              gradientDuoTone="pinkToOrange"
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
            <OAuth />
          </form>
          
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account? </span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {
            error && (
              <Alert className="mt-5" color='failure'>{error}</Alert>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SignUp;
