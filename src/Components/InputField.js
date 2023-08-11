
import React, { useRef } from 'react';

export default function Input(props) {
  const inputBox = useRef();

  const addEntries = () => {
    const inputValue = inputBox.current.value.trim();
    if (inputValue !== '') {
      props.handler(inputValue);
      inputBox.current.value = '';
    }
  };

  return (
    <div className='p-3 flex justify-around'>
      <input
        type='text'
        placeholder='Enter Data Here ...'
        className='p-2 pr-2 text-sm border-[#D70FC6] bg-[#FFE6FC] w-[97%] focus:bg-[#FDF3FD] focus:outline-none blur:bg-[#FFE6FC] sm:p-3 border sm:text-xl'
        ref={inputBox}
      />
      <div
        className='cursor-pointer w-[40px] h-[40px] bg-[#D70FC6] text-white rounded-[100%] flex justify-center items-center sm:w-[50px] sm:h-[50px]'
        onClick={addEntries}
      >
        <i className='fa-solid fa-plus sm:fa-2xl'></i>
      </div>
    </div>
  );
}
