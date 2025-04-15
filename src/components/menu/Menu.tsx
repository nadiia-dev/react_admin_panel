import { Link } from "react-router-dom";
import { menu } from "../../menu_sections";
import "./menu.scss";

const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => {
        return (
          <div key={item.id} className="item">
            <span className="title">{item.title}</span>
            {item.listItems.map((menu_item) => (
              <Link to={menu_item.url} className="listItem">
                <img src={`/${menu_item.icon}`} alt={menu_item.title} />
                <span className="listItemLitle">{menu_item.title}</span>
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
