import { Link } from "react-router-dom";
// imgs
import mainImg from "../assets/main-img.jpg";
// css
import "./mainArticle.css";
import "./featuredProducts.css";
import "./questions.css";
import "./newsLetters.css";
import { useContext, useEffect } from "react";
import { AppContextContainer } from "../context";
function Home() {
  const { state } = useContext(AppContextContainer);
  return (
    <>
      <MainArticle />
      <FeaturedProducts />
      <AboutsInfo />
      <NewsLetters />
    </>
  );
}
// finished
function MainArticle() {
  return (
    <article className="main">
      <article className="left">
        <h2>Buy your accessories</h2>
        <p>
          &nbsp;&nbsp;Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Non quibusdam maxime veniam! Possimus magnam dolor ipsa vel quia modi
          assumenda?
        </p>
        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </article>
      <img src={mainImg} alt="kit" />
    </article>
  );
}

// kind of finished needs detailing but kinda
//impossible until we make data of products
function FeaturedProducts() {
  const { state } = useContext(AppContextContainer);
  return (
    <section className="featured">
      <h1>Featured Products</h1>
      <section className="featuredProducts">
        {state.data.map((each) => {
          const title = each.title.split(" ").slice(0, 5).join(" ");
          if (each.id < 5) {
            return (
              <div className="product" key={each.id}>
                <Link to={`/products/${each.id}`} className="image-container">
                  <img
                    src={each.image}
                    alt={each.title}
                    className="product-img"
                  />
                </Link>
                <h3>&nbsp;{title}</h3>
                <h4>
                  Price : <span style={{ color: "red" }}>${each.price}</span>
                </h4>
              </div>
            );
          }
        })}
      </section>
      <Link to="/products">
        <button className="featured-btn">All Products</button>
      </Link>
    </section>
  );
}
function AboutsInfo() {
  return (
    <section className="abouts">
      <section className="section-center">
        <header>
          <h2>
            Custom accessories <br />
            made for you
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro
            delectus natus sit, a doloremque itaque officiis dolorum earum
            aliquid Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nemo dolorem labore tempore magni ducimus aspernatur consectetur
            possimus at sed facere!
          </p>
        </header>
        <div className="about-containers">
          <div className="about">
            <h2>Mission</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              suscipit iure eligendi commodi at animi beatae deserunt asperiores
              voluptas tenetur.
            </p>
          </div>
          <div className="about">
            <h2>Vision</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              suscipit iure eligendi commodi at animi beatae deserunt asperiores
              voluptas tenetur.
            </p>
          </div>
          <div className="about">
            <h2>History</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              suscipit iure eligendi commodi at animi beatae deserunt asperiores
              voluptas tenetur.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
function NewsLetters() {
  return (
    <section className="news">
      <h2>Subscribe to our Newsletter and get 20% off</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          distinctio expedita culpa, omnis ullam eos tempora. Fuga sit
          consequuntur vitae?
        </p>
        <div className="inputs">
          <input type="email" placeholder="Email Here" required />
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </section>
  );
}
export default Home;
