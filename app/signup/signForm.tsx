'use client'
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios'
import ImageUpload from '../components/ImageUpload';

type Props = {}

const SignForm = (props: Props) => {
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        profileImage: ""
    })

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleImageChange = (result: any) => {
      setUser({
        ...user,
        profileImage: result.info.secure_url,
      });
    };


    const router  = useRouter()

    const Register = () => {
        const data = {
            name:user.name,
            email:user.email,
            password:user.password,
            profileImage: user.profileImage,
            
        }
        axios.post('/api/register', data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
        }).finally(()=>{
            router.push('/signin')
        })
    }

    

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
          <div className='p-10 rounded-lg shadow-lg flex flex-col'>
            <h1 className='text-xl font-medium mb-4'>Sign Up</h1>
            <label htmlFor='name' className='mb-2'>
              Name
            </label>
            <input
              type='text'
              id='name'
              value={user.name}
              placeholder='name'
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <label htmlFor='email' className='mb-2'>
              E-mail
            </label>
            <input
              type='email'
              id='email'
              value={user.email}
              placeholder='email'
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor='password' className='mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={user.password}
              placeholder='password'
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <label htmlFor='profileImage' className='mb-2'>
             Add a Profile Image
            </label>
            <ImageUpload
              imageType='Profile'
              info={{}}
              updateInfo={(updateInfo) => setUser({ ...user, profileImage: updateInfo })}
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
              handleImageChange={handleImageChange}
            />
            <button
              onClick={Register}
              className='p-2 border bg-purple-600 text-white border-gray-300 mt-2 mb-4 focus:outline-none focus:border-gray-600 text-black'
            >
              Register Now
            </button>
            <Link
              href='/signin'
              className='text-sm shadow-md text-center mt-5 text-neutral-900'
            >
              Already have an account
            </Link>
            <Link href='/' className='text-center mt-2'>
              Home
            </Link>
          </div>
        </div>
      );
    };

export default SignForm
