const express = require("express");
const router = express.Router();
const { Favoritos, Propiedades, Users } = require("../models/index");
const { Op } = require("sequelize");

/*** Adds properties to favourites ***/
router.post("/add", (req, res) => {
  console.log(req.body);
  Favoritos.create({
    cantidad: 1
  })
    .then(favoritos => (
      favoritos.setPropiedade(req.body.propiedad)))
    .then(favoritos => (
      favoritos.setUser(req.body.user.id)))
    .then(favoritos => (res.json(favoritos)))
})

/**** Gets properties in the favourites place of a certain user ****/
router.get("/all/:userId", (req, res) => {

  console.log("ID DEL USER EN LA RUTA: ", req.params.userId);

  Favoritos.findAll({
    include: [
      {
        model: Users,
        where: {
          id: req.params.userId
        }
      }, //filtra la busqueda si incluye el modelo user y si el user tiene id
      {
        model: Propiedades
      }
    ]
  }).then(data => {
    res.json(data);
  });
});


/**** Removes property ****/
router.delete("/remove/:userId/:propiedadId", (req, res, next) => {
  console.log("LOS PARAMS EN EL DELETE: ", { userId: req.params.userId, propiedadId: req.params.propiedadId })
  Favoritos.destroy({
    where: {
      propiedadeId: req.params.propiedadId,
      userId: req.params.userId 
    }
  })
    .then(data => res.json(data))
})

module.exports = router;
