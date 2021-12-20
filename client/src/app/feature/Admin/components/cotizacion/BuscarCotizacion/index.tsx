import * as Yup from 'yup';
import * as React from 'react';

import { useFormik } from 'formik';

import { Input } from '../../../../../shared/components/Input/index';
import { Button } from '../../../../../shared/components/Button/index';
import { SpanError } from '../../../../../shared/components/SpanErrors/index';

import { obtenerCotizacionAsync } from '../../../../../core/redux/acciones/cotizaciones/CotizacionesAcciones';

interface FormValues {
  id: number;
}

const initialValues: FormValues = {
  id: 0,
};

const validationSchema = Yup.object().shape<FormValues>({
  id: Yup.number()
    .required('El campo ID es requerido')
    .positive('El campo ID debe ser positivo')
    .integer('El campo ID debe ser un número entero')
});

export const BuscarCotizacion: React.FC = () => {
  const handleSubmit = ( values: FormValues ) => {
    // Reset form
    obtenerCotizacionAsync( values.id );
  };  

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });  

  return (
    <form className="category__form" onSubmit={ formik.handleSubmit } noValidate>
      <h3>Búsqueda de Cotizaciones</h3>

      <label htmlFor="title">
        <b>Identificador</b>
      </label>
      <Input
        id="id"
        name="id"
        type="number"
        placeholder="Identificador de la cotización, por ejemplo: '1'"
        value={ formik.values.id }
        onChange={ formik.handleChange }
      />
      {formik.touched.id && formik.errors.id && (
        <SpanError>{formik.errors.id}</SpanError>
      )}      

      <Button type="submit">Buscar cotización</Button>
    </form>
  );
};