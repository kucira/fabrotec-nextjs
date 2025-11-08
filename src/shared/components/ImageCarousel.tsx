const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            className={
              currentIndex === index
                ? "block w-full"
                : "hidden"
            }
            alt=""
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2"
        onClick={handlePrevious}
      >
        {"\u25c0"}
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2"
        onClick={handleNext}
      >
        {"\u25b6"}
      </button>
    </div>
  );
};

export default ImageCarousel;

