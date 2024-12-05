const Card = ({ title, text, link }) => {
    return (
      <div className="col">
        <div className="card border-red mb-3 h-100" style={{ maxWidth: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
            <a href={link}>Chat to Know More</a>
          </div>
        </div>
      </div>
    );
  };
  
  const CardList = () => {
    const cardData = [
      {
        title: "Card Title 1",
        text: "This is a longer card with supporting text below as a natural lead-in to additional content.",
        link: "../pages/Chatbot.js",
      },
      {
        title: "Card Title 2",
        text: "This content is a little bit longer.",
        link: "../pages/Chatbot.js",
      },
      {
        title: "Card Title 3",
        text: "This is a longer card with supporting text below as a natural lead-in to additional content.",
        link: "../pages/Chatbot.js",
      },
      {
        title: "Card Title 4",
        text: "This content is a little bit longer.",
        link: "../pages/Chatbot.js",
      },
      {
        title: "Card Title 5",
        text: "This content is a little bit longer.",
        link: "../pages/Chatbot.js",
      },
    ];
  
    return (
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    );
  };
export default CardList;