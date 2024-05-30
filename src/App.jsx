import { useState } from 'react';
import { requestToGroqAI } from './utils/groq';
import { Light as SyntaxHighlight } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import './App.css';
import { TailSpin } from 'react-loader-spinner'; // Jika menggunakan react-loader-spinner

function App() {
  const [data, setData] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setButtonDisabled(true);
    
    setTimeout(async () => {
      const aiResponse = await requestToGroqAI(userInput);
      setData(aiResponse);
      setLoading(false);
      setButtonDisabled(false);
    }, 3000); // Tunggu 3 detik sebelum menampilkan hasil
  };

  return (
    <main className='flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto'>
      <h1 className="text-4xl text-indigo-500">Cet JIPITI</h1>
      
      <form className='flex flex-col gap-4 py-4 w-full' onSubmit={(e) => e.preventDefault()}>
        <textarea
          id="content"
          className='py-2 px-4 text-md rounded-md border-2'
          wrapLongLines={false}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></textarea>
        <button 
          type='button'
          onClick={handleSubmit}
          disabled={buttonDisabled}
          className={`py-2 px-4 font-bold text-white rounded-md ${buttonDisabled ? 'bg-gray-500' : 'bg-indigo-500'}`}>
          {loading ? "Loading..." : "Kirim"}
        </button>
      </form>
      <div className='max-w-xl w-full mx-auto'>
        {loading ? (
          <div className='flex justify-center py-4'>
            <TailSpin color="#4f46e5" height={50} width={50} />
          </div>
        ) : data ? (
          <SyntaxHighlight language='swift' style={darcula} wrapLongLines={true}>{data.toString()}</SyntaxHighlight>
        ) : null }
      </div>
      <footer>Created by Apep Wahyudin</footer>
    </main>
  );
}

export default App;
