import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ChatButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Chat button clicked');
    navigate('/chat'); 
  };

  return (
    <Button onClick={handleClick}>
      Chat
    </Button>
  );
};

export default ChatButton;