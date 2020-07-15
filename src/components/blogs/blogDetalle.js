import React from "react";
import PropTypes from "prop-types";
import Header from "../base/Header";
import Article from "../base/Article";
import Footer from "../base/Footer";

// componentDidMount()
// componentDidUpdate()
// componentWillUnmount()

const BlogDetalle = ({ Mensajes = [] }) => {
  console.log("mensaje de blog, ", Mensajes);
  return (
    <div className="w3-container">
      {Mensajes.map((item, index) => {
        return (
          <div className="w3-row-padding" key={item.id}>
            <Header>
              {item.idUsuario} - {item.fecha}
            </Header>
            <Article>{item.mensaje}</Article>
            <hr size="1" color="black" />
          </div>
        );
      })}
    </div>
  );
};

BlogDetalle.propTypes = {
  Mensajes: PropTypes.array.isRequired,
};

export default BlogDetalle;
