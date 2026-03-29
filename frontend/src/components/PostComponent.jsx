import React, { useRef, useState } from 'react'
import { FcAddImage } from "react-icons/fc";
import { BsEmojiLaughing } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'react-toastify'

const PostComponent = (props) => {

    const [image, setimage] = useState('')
    const [show, setshow] = useState(false);

    let titleRef = useRef()

    let token = localStorage.getItem('auth')

    function handleShowEmoji(){
        setshow(!show)
    }

    function handleEmoji(e){
        let title = titleRef.current.value
        titleRef.current.value = title + e.emoji
    }

    const handleInputChanger = (e) => {
        setimage(e.target.files[0])
    }

    async function handleSubmit(){
        let formData = new FormData()
        formData.append('title',titleRef.current.value)
        formData.append('image',image)

        let res = await fetch('http://localhost:8090/posts/create',{
            method:'POST',
            headers:{
                'authorization':token
            },
            body:formData
        });

        let data = await res.json();

        if(res.status==200 || res.status==201){
            toast.success(data.msg)
            titleRef.current.value='';
            setimage('')
            props.getAllProducts()
        }
        else{
            toast.error(data.msg)
        }
    }

  return (

    <div className='bg-[#f0f2f5] minheight:500px flex justify-center pt-8'>

        <div className='bg-white w-[520px] rounded-xl shadow p-4'>

            {/* Top input */}
            <div className='flex items-center gap-3 pb-3'>

                {/* FIXED PROFILE PIC */}
                <img
                    src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                    alt='profile'
                    className='w-10 h-10 rounded-full object-cover'
                />

                <textarea
                    ref={titleRef}
                    rows="1"
                    placeholder="What's on your mind?"
                    className='bg-[#f0f2f5] w-full rounded-full px-4 py-2 resize-none outline-none text-sm'
                />

            </div>

            <hr className='my-2'/>

            {/* Image preview */}
            {image && (
                <div className='mt-3 relative'>

                    <img
                        src={URL.createObjectURL(image)}
                        alt=''
                        className='w-full max-h-[300px] object-cover rounded-lg border'
                    />

                    <button
                        onClick={()=>setimage('')}
                        className='absolute top-2 right-2 bg-black text-white rounded-full w-7 h-7 text-sm'
                    >
                        ✕
                    </button>

                </div>
            )}

            {/* bottom options */}
            <div className='flex justify-between items-center mt-3'>

                <div className='flex gap-4'>

                    <label
                        htmlFor='file'
                        className='flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100'
                    >
                        <FcAddImage size={22}/>
                        <span className='text-gray-600 text-sm font-medium'>
                            Photo
                        </span>
                    </label>

                    <input
                        type='file'
                        id='file'
                        hidden
                        onChange={handleInputChanger}
                    />

                    <button
                        onClick={handleShowEmoji}
                        className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100'
                    >
                        <BsEmojiLaughing size={20} color='orange'/>
                        <span className='text-gray-600 text-sm font-medium'>
                            Feeling
                        </span>
                    </button>

                </div>

                <button
                    onClick={handleSubmit}
                    className='bg-blue-500 text-white px-5 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition'
                >
                    Post
                </button>

            </div>

            {/* emoji picker */}
            {show && (
                <div className='mt-3'>
                    <EmojiPicker
                        onEmojiClick={handleEmoji}
                    />
                </div>
            )}

        </div>

    </div>

  )
}

export default PostComponent