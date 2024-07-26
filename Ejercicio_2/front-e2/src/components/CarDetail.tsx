import React, { useEffect, useState } from "react";
import { getCarById } from "../helper/crud.ts";
import { useParams, Link } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";

interface Car {
  id: string;
  make: string;
  model: string;
  year: string;
  favorite: boolean;
}

export const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car>();

  useEffect(() => {
    const fetchCar = async () => {
      const carData = await getCarById(id);
      setCar(carData);
    };
    fetchCar();
  }, [id]);

  return (
    <Box sx={{ padding: 2 }}>
      {car ? (
        <div>
          <div>
            <Typography variant="h4" component="div" gutterBottom>
              {car.make} {car.model} ({car.year})
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
              Favoritos: {car.favorite ? "Si" : "No"}
            </Typography>
            <Typography variant="body2" component="div" gutterBottom>
              ID: {car.id}
            </Typography>
          </div>
          <Button
            component={Link}
            to={`/add-car`}
            variant="outlined"
            color="success"
          >
            Agregar Vehiculo
          </Button>
          <Button component={Link} to={`/`} variant="outlined" color="success">
            Ir al inicio
          </Button>
        </div>
      ) : (
        <Typography variant="h6" component="div">
          Loading...
        </Typography>
      )}
    </Box>
  );
};
