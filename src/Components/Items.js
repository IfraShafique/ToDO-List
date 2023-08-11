import React, {useState} from 'react'


export default function Items(props) {
  const [done, setDone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(props.item);

  const handleEditSave = () => {
    props.updateTodo(props.id, editedItem);
    setIsEditing(false);
  };

  return (
    <div
      onClick={() => setDone(!done)}
      className={`
        select-none cursor-pointer w-full border-b text-sm sm:text-xl rounded bg-[#F685EE] mb-1 sm:mb-2 p-2
        sm:p-3 flex justify-between overflow-auto hover:shadow-md
          ${isEditing ? 'bg-[#F685EE]' : ''}`}
    >
      {/* ***Left*** */}
      <div className='text-xs sm:text-[1rem] text-black sm:[80%] xl:w-[90%] w-[80%]'>
        <span className='mr-2 text-[#000000] font-semibold'>
          {props.time}
        </span>
        <span>
          {isEditing ? (
            <input
              type='text'
              value={editedItem}
              onChange={(e) => setEditedItem(e.target.value)}
            />
          ) : (
            props.item
          )}
        </span>
      </div>

      {/* ****Right**** */}
      <div className='md:mr-4 inline'>
        {isEditing ? (
          <span >
            <i
              className='fa-regular fa-check-square fa-sm text-[#00C853]  hover:text-black'
              onClick={handleEditSave}
            ></i>
          </span>
        ) : (
          <span className='bg-[#F685EE]'>
            <i
              className='fa-regular fa-pen-to-square fa-sm sm:text-[#D70FC6] text-white hover:text-black'
              onClick={() => setIsEditing(true)}
            ></i>
          </span>
        )}
        &nbsp;&nbsp;
        <i
          className='fa-regular fa-trash-can sm:fa-2xl text-sm sm:text-[#D70FC6] text-white hover:text-black'
          onClick={() => props.removeHandler(props.id)}
        ></i>
      </div>
    </div>
  );
}
