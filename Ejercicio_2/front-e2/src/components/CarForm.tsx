import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addCar } from "../helper/crud.ts";
import { TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

interface CarFormInputs {
  make: string;
  model: string;
  year: string;
  favorite: boolean;
}

export const CarForm = () => {
  const { register, handleSubmit, reset } = useForm<CarFormInputs>();

  const onSubmit: SubmitHandler<CarFormInputs> = async (data) => {
    await addCar(data);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        {...register("make", { required: true })}
        label="Marca"
        variant="outlined"
      />
      <TextField
        {...register("model", { required: true })}
        label="Modelo"
        variant="outlined"
      />
      <TextField
        {...register("year", { required: true })}
        label="Año"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Agregar
      </Button>
      <Button component={Link} to={`/`} variant="outlined" color="success">
        Ir al inicio
      </Button>
    </Box>
  );
};
