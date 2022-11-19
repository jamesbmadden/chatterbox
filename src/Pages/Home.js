import './Home.css';

import SpeechRecog from '../SpeechRecognition';

function Home() {
  return (
      <div className="Home">
          <header className="Home-header">

              <SpeechRecog></SpeechRecog>
              
          </header>
          
        <h2>Hello, spotify username</h2>

        <p>What would you like to listen to?</p>
          

        </div>
  );
}

export default Home;