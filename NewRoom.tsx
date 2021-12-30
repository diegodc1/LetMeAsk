import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';

import { ButtonQuestion, Button, ButtonNewRoom} from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';


import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    

    if (!roomRef.exists()) {
      alert('Room not exist');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <ButtonNewRoom type="submit">
              Criar sala
            </ButtonNewRoom>
          </form>
          <div className="separator">ou entre em uma sala</div>
          <div className="enter-room-title"><h2>Entrar em uma sala</h2></div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

function setRoomCode(value: string): void {
  throw new Error('Function not implemented.');
}

