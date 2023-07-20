import React from "react";
// import Cart from './Cart.js';

// this include everything except our header
export default function Main(props) {
  function inputCart(e) {
    props.setCartStock((cart) => {
      return parseInt(e.target.value);
    });
  }
  const allImages = [
    "image-product-1",
    "image-product-2",
    "image-product-3",
    "image-product-4",
  ];

  // making media query to disable zoom effect on mobile view
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const breakpoint = 600;

  React.useEffect(() => {
    function handleWindowSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowSize);
    // handleWindowSize()
    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);
  // it will help with buttons to navigate in mobile view
  const [imageCount, setImageCount] = React.useState(0);

  // making a hook for image style, so to manipulate it later in zoom effect
  const [imageStyle, setImageStyle] = React.useState({
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/${allImages[imageCount]}.jpg)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  });

  // it works when any thumbnail image get clicked
  function replaceBackground(e) {
    const selectedImageIndex = e.target.getAttribute("data-index");
    setImageStyle((prevStyle) => ({
      ...prevStyle,
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/${allImages[selectedImageIndex]}.jpg)`,
    }));

    // replacing styling class in slide--images 
    const selectedImage = document.querySelector('.image--selected')
    if(selectedImage)
    selectedImage.classList.remove('image--selected')
    e.target.classList.add('image--selected')
  }

  // these are here to add zoom effect in the pics
  function handleImageHover(e) {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setImageStyle((prevStyle) => ({
      ...prevStyle,
      backgroundSize: "auto",
      backgroundPosition: `${x}% ${y}%`,
    }));
  }

  function handleMouseLeave() {
    // console.log("Leave")
    setImageStyle((prevStyle) => ({
      ...prevStyle,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }));
  }

  // making every image thumbnail a button component to render using array, map.
  const imagesForSlides = allImages.map((image, index) => {
    return (
      <button key={index}>
        <img
          onClick={(e) => replaceBackground(e)}
          data-index={index}
          className={index==imageCount? "image--selected": ""}
          src={`${process.env.PUBLIC_URL}/images/${image}-thumbnail.jpg`}
        />
      </button>
    );
  });

  return (
    <main className="main">
      <div className="image-section">
        <div
          className="product-image flex"
          style={imageStyle}
          onMouseMove={(e)=>windowWidth>breakpoint? handleImageHover(e): ()=>false}
          onMouseOut={(e) =>windowWidth>breakpoint? handleMouseLeave(e): ()=>false}
        >
          <button
            id="icon-prev"
            onClick={() => {
              // updating counter and changing in styling
              setImageCount((prevCount) => {
                if (prevCount == 0) return allImages.length - 1;
                else return (prevCount - 1) % allImages.length;
              });
              setImageStyle(prevStyle=>({
                ...prevStyle,
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/${allImages[imageCount]}.jpg)`,
              }))              
            }}
          >
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/images/icon-previous.svg`}
            ></img>
          </button>
          <button
            id="icon-next"
            onClick={() =>{
              setImageCount((prevCount) => (prevCount + 1) % allImages.length)
              setImageStyle(prevStyle=>({
                ...prevStyle,
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/${allImages[imageCount]}.jpg)`,
              }))     
            }
            }
          >
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/images/icon-next.svg`}
            ></img>
          </button>
        </div>
        {windowWidth>breakpoint && <div className="product-image--slide">{imagesForSlides}</div>}
      </div>
      <div className="product-info">
        <div>
          <h1>SNEAKER COMPANY</h1>
          <h2>Fall Limited Edition Sneakers</h2>
          <p>
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>
        </div>
        <div className="product-price">
          <span className="product-price--rate">$125.00</span>
          <span className="product-price--dis-percent">50%</span>
          <span className="product-price--discount">$250.00</span>
        </div>
        <div className="product-cart">
          <form>
            <div className="product-cart--input">
              <button onClick={props.handleCartMinus}>
                <img
                  alt=""
                  src={`${process.env.PUBLIC_URL}/images/icon-minus.svg`}
                />
              </button>
              <input
                type="number"
                onChange={inputCart}
                placeholder="0"
                value={props.cartStock}
              />
              <button onClick={props.handleCartPlus}>
                <img
                  alt=""
                  src={`${process.env.PUBLIC_URL}/images/icon-plus.svg`}
                />
              </button>
            </div>
            <div>
              <button
                className="product-cart--button"
                onClick={props.updateCartStock}
              >
                <img
                  alt=""
                  src={`${process.env.PUBLIC_URL}/images/icon-cart.svg`}
                />
                Add to Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
