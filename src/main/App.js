import React, { useState } from 'react'
import "../styles/main.css"
import "../styles/normalize.css"
const App = () => {

  const [input, setInput] = useState("Can you explain the significance of sound and meaning in Shaving?");
  const [chatLog, setChatLog] = useState([]);
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setChatLog([...chatLog, { user: "me", message: input }]);
    setInput("");
    // const response = await fetch('http://localhost:8080/', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     message: input
    //   })
    // })
    // const data = await response.json();
    // console.log(data);
    // setChatLog(prev => [...prev, { user: "chatgpt", message: data.message.choices[0].text }]);
    // simulate server response delay, then type the response out
    setTimeout(() => {
      const botResponse = `Sound and meaning— You’re delving into some pretty complex topics! Sound and meaning is not merely a tool to make the work pleasurable to the reader— it’s to place the author’s intention of the work dead center. So that the reader can’t miss there point.`;

      // append an empty bot message which we'll fill in as we 'type'
      setChatLog(prev => [...prev, { user: "chatgpt", message: "" }]);
      setLoading(false);
      let idx = 0;
      const speed = 20; // ms per character (adjust for typing speed)
      const typer = setInterval(() => {
        idx++;
        setChatLog(prev => {
          // copy log and replace the last chatgpt message with an updated message
          const next = [...prev];
          for (let i = next.length - 1; i >= 0; i--) {
            if (next[i].user === 'chatgpt') {
              next[i] = { ...next[i], message: botResponse.slice(0, idx) };
              break;
            }
          }
          return next;
        });

        if (idx >= botResponse.length) {
          clearInterval(typer);
          
        }
      }, speed);

    }, 3500)
    

  }
  const clearChat = () => {
    setChatLog([]);
  }
  const changeMode = () => {
    setMode(mode === 'dark' ? 'white' : 'dark');
  }
  return (
    <div className='app'>
      <aside className='side-menu'>
        <div>
        <div className='side-menu-newChat' onClick={clearChat}>
          <span className='plus'>+</span> New chat
        </div>
        <div className='side-menu-newChat' >
          <span className='plus'></span> Summary of A Doll's House
        </div>
        <div className='side-menu-newChat' >
          <span className='plus'></span> 4 Human-Sounding Informal Poetry Responses
        </div>
        <div className='side-menu-newChat' >
          <span className='plus'></span> Summary of Wuthering Heights
        </div>
        </div>
        
        <div className='side-menu-bottom'>
          <hr />
          <div className='side-menu-newChat' onClick={changeMode}>
            <span className='plus'>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></span>
            Light Mode
          </div>


        </div>
      </aside>
      <section className={`chatbox ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`} >




        <div className='chat-log'>
          {chatLog.length > 0 ?
            <>
            {chatLog.map((el, i) => {
              return <ChatMessage key={i} message={el} mode={mode} />
            })}
            {loading && <ChatMessage key="loading" message={{ user: 'chatgpt', message: <LoadingDots mode={mode} /> }} mode={mode} />}
            </>
            :
            <h1 className='start-converstion' >
              O'NeillGPT<br />
              <span className='sub-text'>Ask anything.</span>
            </h1>
          }
        </div>






        <div className={`chat-input blur`} >
          <div className={`chat-input-div`} >
            <form onSubmit={handleSubmit}>
              <input
                placeholder='Start here'
                className={`chat-input-box ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`}
                value={input}
                disabled={loading}
                onChange={(e) => { setInput(e.target.value) }}
              />
            </form>
            <a className='chat-input-icon' onClick={handleSubmit}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1" height="1.13em" width="1.13em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </a>
          </div>
          <div className='chat-about'>
            <span>Darrell never makes mistakes</span>
          </div>
        </div>
      </section>
    </div>
  )
}
export default App

// ...existing code...
const LoadingDots = ({ mode }) => {
  // simple three-dot typing animation; uses currentColor so it respects theme text color
  return (
    <div className={`loading-dots ${mode === 'dark' ? 'bg-dark' : ''}`} style={{display:'flex', alignItems:'center', padding:'6px 0'}}>
      <span style={{width:8,height:8,borderRadius:8,display:'inline-block',marginRight:6,background:'currentColor',opacity:0.25,animation:'ld 1s infinite'}}></span>
      <span style={{width:8,height:8,borderRadius:8,display:'inline-block',marginRight:6,background:'currentColor',opacity:0.25,animation:'ld 1s infinite', animationDelay:'0.15s'}}></span>
      <span style={{width:8,height:8,borderRadius:8,display:'inline-block',background:'currentColor',opacity:0.25,animation:'ld 1s infinite', animationDelay:'0.3s'}}></span>
      <style>{`
        @keyframes ld {
          0% { transform: translateY(0); opacity: 0.25; }
          50% { transform: translateY(-6px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.25; }
        }
      `}</style>
    </div>
  )
}

const ChatMessage = ({ message, mode }) => {
  return (
    <div className={`chat-message ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`} >
      <div className='chat-message-center'>
        <div className={`avatar ${message.user === 'chatgpt' && 'chatGPT'}`}>
          {
            message.user === 'chatgpt' &&
            <img width={30}  src='https://f.techman.dev/d/oneillURcpj.png#b176a67cce7b73012874a93698fac380da388e1b99166bbf6b2373c3c996ca81' alt='ChatGPT Avatar' className='avatar-image' />
          }
        </div>
        <div className='message' >
          {message.message}
        </div>
      </div>
    </div>
  )
}