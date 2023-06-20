import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState([
    { title: 'AmordeBar', file: '/musicas/AmordeBar.mp3' },
    { title: 'LÁGRIMAS', file: '/musicas/LÁGRIMAS.mp3' },
    // Adicione mais músicas aqui...
  ]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', updateTime);
    audioRef.current.addEventListener('loadedmetadata', setAudioDuration);

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateTime);
      audioRef.current.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, []);

  const updateTime = () => {
    const { currentTime } = audioRef.current;
    setCurrentTime(currentTime);
  };

  const setAudioDuration = () => {
    const { duration } = audioRef.current;
    setDuration(duration);
  };

  const togglePlay = () => {
    const audioElement = audioRef.current;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const addNewSong = () => {
    const newSong = { title: 'Nova Música', file: '/musicas/nova-musica.mp3' };
    setSongs((prevSongs) => [...prevSongs, newSong]);
  };

  const currentSong = songs[currentSongIndex];
  const progressBarWidth = (currentTime / duration) * 100 || 0;

  return (
    <div className="music-app">
      <h1>Music Player</h1>
      <div className="music-controls">
        <button className="control-btn" onClick={playPreviousSong}><FaBackward /></button>
        <button className="control-btn" onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="control-btn" onClick={playNextSong}><FaForward /></button>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressBarWidth}%` }}></div>
      </div>
      <div className="time-labels">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
        </div>
      {/* <button className="add-song-btn" onClick={addNewSong}>Adicionar Nova Música</button> */}
      <audio ref={audioRef} src={currentSong.file} />
    </div>
  );
};
export default App;
