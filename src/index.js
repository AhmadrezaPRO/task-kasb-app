import ReactDOM from 'react-dom/client';
import Carousel from "./components/Carousel";
import './App.css';

const App = () => {
    const images = [
        'images/image1.png',
        'images/image2.png',
        'images/image3.png',
        // 'images/image4.jpg',
        // 'image3.jpg',
        // Add more image URLs as needed
    ];

    return (
        <div className="app-container">
            <h1>Simple Carousel by Ahmad Reza Yoozbashi Zadeh</h1>
            <Carousel images={images} autoPlay={true} interval={5000} />
        </div>
    );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);