import '../App.css';

import SpeechRecog from '../SpeechRecognition';

function Home() {
  return (
      <div className="Home">
          <header className="Home-header">

              <SpeechRecog></SpeechRecog>
              
          </header>
          

        </div>
  );
}

export default Home;