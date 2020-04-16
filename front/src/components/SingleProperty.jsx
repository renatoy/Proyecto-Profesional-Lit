import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ModalContainer from "../containers/ModalContainer";
import { useHistory } from "react-router-dom";

const style = {
  iconStyle: {
    textAlign: "center"
  },
  arrowcolor: {
    filter: "invert(100%)"
  },
  single: {
    marginTop: "3%"
  },

  centerButtoms: {
    display: "flex",
    justifyContent: "space-between"
  }
};


export default ({ propiedad, handleDelete }) => {

  let history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <div className="container" style={style.single}>
    <div style={style.centerButtom}>
      {/* <Link to="/"> */}
        <Button onClick={ handleClick } style={{ marginLeft: "2%" }} color="primary">
        <h5>Volver atras</h5>
        </Button>
      {/* </Link> */}
      <Button size="small" color="primary">
        <h5 data-toggle="modal" data-target={`#editionFormId${propiedad.id}`}>
          Editar datos
        </h5>
      </Button>

      <Button onClick = { () => { handleDelete(propiedad.id) } } style={{ float: "right" }} size="small" color="primary">
        <h5>
          Eliminar
        </h5>
      </Button>
    </div>
      {propiedad.nombre && (
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          style={{ height: "55vh" }}
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            {propiedad.imagen.map(img => {
              return (
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={propiedad.imagen.indexOf(img)}
                  className={
                    !propiedad.imagen.indexOf(img) ? "active" : "nothing"
                  }
                  key={img}
                />
              );
            })}
          </ol>
          <div className="carousel-inner">
            {propiedad.imagen.map(img => (
              <div
                key={img}
                className={
                  !propiedad.imagen.indexOf(img)
                    ? "carousel-item active"
                    : "carousel-item"
                }
              >
                <img
                  src={img}
                  className="d-block w-100"
                  alt="..."
                  style={{
                    height: "55vh",
                    objectFit: "contain"
                  }}
                />
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
            style={style.arrowcolor}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
            style={style.arrowcolor}
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      )}

      {propiedad.nombre && (
        <div>
          <br />
          <h2 className="text-center">{propiedad.nombre}</h2>
          <p className="text-center text-wrap">{propiedad.descripcion}</p>
          <div style={style.iconStyle}>
            <h4>${propiedad.precio}</h4>
          </div>
        </div>
      )}
      <br />
      <ModalContainer />
    </div>
  );
};
