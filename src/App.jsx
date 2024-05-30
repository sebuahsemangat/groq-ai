import { useState } from 'react';
import { requestToGroqAI } from './utils/groq';
import { Light as SyntaxHighlight } from 'react-syntax-highlighter';
import {darcula} from "react-syntax-highlighter/dist/cjs/styles/prism"
import './App.css';

function App() {
  const [data, setData] = useState("");

  const handleSubmit = async () => {
      const ai = await requestToGroqAI(content.value);
      setData(ai);
  };
  return (
    <main className='flex flex-col min-h-[80vh] 
    justify-center items-center max-w-xl w-full mx-auto'>
      <h1 className="text-4xl text-indigo-500">Resep GPT</h1>
      
      <form className='flex flex-col gap-4 py-4 w-full'>
        <textarea id="content" className='py-2 px-4 text-md rounded-md border-2' wrapLongLines={false}></textarea>
        {/* <input 
            placeholder='Ketik permintaan'
            id='content'
            type='text'
            className='py-2 px-4 text-md rounded-md border-2'/> */}
        <button 
            type='button'
            onClick={handleSubmit}
            className='bg-indigo-500 py-2 px-4 font-bold text-white rounded-md'>Rekomendasikan Resep!</button>
      </form>
      <div className='max-w-xl w-full mx-auto'>

      {data ? (
        <SyntaxHighlight language='swift' style={darcula} wrapLongLines={true}>{data.toString()}</SyntaxHighlight>
        
      ) : null }
      </div>
      <footer>Created by Apep Wahyudin</footer>
    </main>
    
  )

}

export default App
