import React, { useEffect, useState } from "react";
import { getCars, updateCar } from "../helper/crud.ts";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface Car {
  id: string;
  make: string;
  model: string;
  year: string;
  favorite: boolean;
}

export const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    getCars(setCars);
  }, []);

  const handleFavorite = async (carId: string) => {
    await updateCar(carId, { favorite: true });
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === carId ? { ...car, favorite: true } : car
      )
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Listado de Autos
      </Typography>
      <List>
        <div>
          {cars.map((car) => (
            <ListItem
              key={car.id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText
                primary={`${car.make} ${car.model} (${car.year})`}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleFavorite(car.id)}
              >
                Agregar a Favoritos
              </Button>
              <Button
                component={Link}
                to={`/car/${car.id}`}
                variant="contained"
                color="primary"
              >
                Ver Detalles
              </Button>
            </ListItem>
          ))}
          <Button
            component={Link}
            to={`/add-car`}
            variant="contained"
            color="success"
          >
            Agregar Vehiculo
          </Button>
        </div>
      </List>
    </Box>
  );
};
