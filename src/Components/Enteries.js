import React, {useState, useEffect} from 'react'
import Items from './Items'

export default function Enteries(props) {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Sort the data when the component renders or when props.data changes
    const sortedItems = [...props.data].sort((a, b) =>
      a.item.localeCompare(b.item)
    );
    setSortedData(sortedItems);
  }, [props.data]);

  const items = sortedData.map((singleData) => {
    const capitalizeCase =
      singleData.item.charAt(0).toUpperCase() + singleData.item.slice(1);

    return (
      <Items
        removeHandler={props.removeHandler}
        updateTodo={props.updateTodo}
        key={singleData.id}
        id={singleData.id}
        item={capitalizeCase}
        time={singleData.time}
      />
    );
  });

  return (
    <div className='p-3'>
      <div className='max-h-[30vh] sm:max-h-[50vh] overflow-y-auto'>
        <ul className='mt-4 '>{items}</ul>
      </div>
    </div>
  );
}



  );
}



