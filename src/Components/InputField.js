import React, {useRef} from 'react'

export default function Input(props) {
  // Ref use as a ID in react
  const inputBox = useRef();
  const AddEnteries = () =>{
    props.handler(inputBox.current.value)
        inputBox.current.value = "";
  }

  // const emptyInput = () => {
  //   let inputText = document.getElementById('text').value; // Get the value of the input field
  //   const inputRegex = /^\w[A-Za-z]$/;
  
  //   if (!inputRegex.test(inputText)) {
  //     return "Enter a valid text";
  //   } else {
  //     return AddEnteries(); 
    
  //   }
  // };
  

 

  return (
    <div className='p-3 flex justify-around'>
      <form className='w-[100%]'>
      <input type="text" name="text" id="text" placeholder='Enter Data Here ...' 
      className='p-2 pr-2 text-sm border-[#D70FC6] bg-[#FFE6FC] w-[97%]
       focus:bg-[#FDF3FD] 
      focus:outline-none blur:bg-[#FFE6FC] sm:p-3 border sm:text-xl'  ref={inputBox} 
      /></form>
    
      <div className='cursor-pointer w-[40px] h-[40px] bg-[#D70FC6] text-white
       rounded-[100%] flex justify-center items-center sm:w-[50px] 
       sm:h-[50px]' onClick={AddEnteries}>
      <i className="fa-solid fa-plus sm:fa-2xl"></i>
      </div>
    </div>
    
  )
}
