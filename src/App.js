import { Image, Button, Rate } from 'antd';
import './App.css';

function App() {
  return (
    <div className="App">
      <Image 
        width={200}
        src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      />

      <Button>
        Submit
      </Button>
      
      <Rate/>
    </div>
  );
}

export default App;
