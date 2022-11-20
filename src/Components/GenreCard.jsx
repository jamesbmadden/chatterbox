import './GenreCard.css';

export default function GenreCard({ genre, image, onClick, colour, transparent }) {

  return (
    <a className='genrecard' onClick={onClick} style={{background: `linear-gradient(90deg, ${colour}, ${colour}, ${transparent})`}}>
      <h1 className='genrecard-title'>{genre}</h1>
      <img className='genrecard-image' src={image}></img>
    </a>
  );

}