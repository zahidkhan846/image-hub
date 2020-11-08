import { useEffect, useState } from "react";
import { ImageCard } from "./components/ImageCard";
import { Search } from "./components/Search";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${search}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [search]);

  return (
    <div className="container mx-auto">
      <Search onSearch={(search) => setSearch(search)} />
      {!isLoading && images.length < 1 && "No Images Found"}
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
