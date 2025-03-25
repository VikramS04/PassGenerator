import { useState , useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [number, setNumbersAllowed] = useState(false);
  const [character, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passGenerator = useCallback( () => { 
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let num = '0123456789';
    let sym = '!@#$%^&*()_+';

    if(number){
      str += num;
    } 
    if(character){
      str+= sym;
    }
    for(let i = 0 ; i< length ; i++){
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)

    }
    setPassword(pass);

  },[length, number ,character])

  useEffect(() => { passGenerator() }, [ length, number , character, passGenerator])

  // useRef Hook

  const passRef = useRef(null)

  const copyPasswordToClipboard =  useCallback( ()=>{
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,50);
    window.navigator.clipboard.writeText(password); 
  },[password] )
  
  return (
    <>
    <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8  bg-gray-800 text-orange-500 '>
      <div>
        <h1 className='text-center text-white'>Password Generator: </h1>
        <br></br>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          
          <input 
              type="text"
              value={password}
              className=" bg-amber-50 outline-amber-50 w-full py-1 px-3 text-gray-500"
              id="passBar"
              placeholder="Password"
              readOnly
              ref={passRef}
          />
          <button 
          className='bg-blue-600  outline-none text-white px-3 py-0.5 shrink-0  '
          onClick={copyPasswordToClipboard}
          >Copy
          </button>
        </div>
      </div>

      <div className='flex items-center gap-x-1' >
        <div>
          <input 
          type="range"
          min={8}
          max={50}
          value={length}
            className='cursor-pointer'
          onChange={(event) => {setLength(event.target.value)}} />
          <label >Length: {length}</label>
      </div>
      <div>
        <label>
          <input 
          type="checkbox"
          defaultChecked={number}
          name="Numbers"
          onChange={()=> {
            setNumbersAllowed((prev) => !prev);
          }}
          className='p-4'
          />
          Numbers
        </label>
      </div>
        <div >
          <label>
            <input 
            type="checkbox"
            defaultChecked={character}
            name="characters"
            onChange={()=> {
              setCharactersAllowed((prev) => !prev);
            }}
            className="p-4"
          />
          Characters 
          </label>
        </div>
      </div>
    </div>  
    </>
  )
}

export default App
