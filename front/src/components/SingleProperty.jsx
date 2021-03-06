import React, { Frament } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ModalContainer from "../containers/ModalContainer";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import red from "@material-ui/core/colors/red";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const style = {
  iconStyle: {
    textAlign: "center"
  },
  arrowcolor: {
    filter: "invert(100%)"
  },
  single: {
    marginTop: "-44%",
    marginLeft: "15%"
  },

  centerButtoms: {
    display: "flex",
    justifyContent: "space-between"
  }
};
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),

  }
}));

export default ({ user, propiedad, handleDelete, handleAddFavorite }) => {
  console.log("USUARIO: ", user);
  const classes = useStyles();
  const primary = red[500];
  let history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <div className="container" style={style.single}>
      <div style={style.centerButtoms}>
        <Button
          onClick={handleClick}
          className={classes.button}
          startIcon={<ArrowBackIcon />}
          style={{ marginLeft: "4%" }}
        >
          Volver atrás
        </Button>

        {user.admin ? (
          <>
            <Button
              variant="contained"
              // style={{backgroundColor:"#f44336"}}
              className={classes.button}
              startIcon={<EditIcon />}
              data-toggle="modal"
              data-target={`#editionFormId${propiedad.id}`}
            >
              Editar Propiedad
            </Button>
            <Link to="/">
              <Button
                variant="contained"
                style={{ backgroundColor: "#f44336" }}
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => {
                  handleDelete(propiedad.id);
                }}
              >
                Eliminar
            </Button>
            </Link>

          </>
        ) : null}
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


      <Button
        onClick={handleAddFavorite}
      >
        <FavoriteBorderIcon />
      </Button>

      <br />
      <ModalContainer />
    </div>
  );
};
