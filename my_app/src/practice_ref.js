import React,{useEffect, useState, useRef} from 'react'

export default function PracticeRef() {
  const [data, setData]=useState(false)
  // const refData = useRef("")
  // useEffect(()=>{
  //   if(data){
  //     setCount(count+1)
  //     refData.current=data
  //   }
  // },[data]);
  // console.log(refData);
  // return (
  //   <div><input type={'text'} onChange={(e)=>setData(e.target.value)}/>count:{count} refData:{refData.current}</div>
  // )
  const inputEl = useRef(null);
  console.log('hello world');
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
    setData(!data);
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button className='border border-black' onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
