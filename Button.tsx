import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';

import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function ButtonQuestion({ isOutlined = false, ...props }: ButtonProps) {
  const notify = () => toast.success('Pegunta enviada!')

  return (
   <div>
      <button 
        className={`button ${isOutlined ? 'outlined' : ''}`}
        {...props}
        onClick={notify}/>
        <Toaster />
      
   </div>
  )
}

export function ButtonNewRoom({ isOutlined = false, ...props }: ButtonProps) {
  const notify = () => toast.success('Sala criada com sucesso!')

  return (
   <div>
      <button 
        className={`button ${isOutlined ? 'outlined' : ''}`}
        {...props}
        onClick={notify}/>
        <Toaster />
      
   </div>
  )
}

type RoomCodeProps = {
  code: string;
} 

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
}}





export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  )
}

