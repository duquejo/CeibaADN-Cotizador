import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { Button } from '../../../../../shared/components/Button/index';
import { CategoriaUsuarios } from '../../../models/CategoriaUsuarios';
import { FormikHelpers } from 'formik/dist/types';
import { Input } from '../../../../../shared/components/Input/index';
import { Small } from '../../../../../shared/components/Small/index';
import { SpanError } from '../../../../../shared/components/SpanErrors/index';
import { TextArea } from '../../../../../shared/components/TextArea/index';
import { useFormik } from 'formik';

interface FormValues {
  title: string;
  description?: string;
  priceHigh: number | string;
  priceLow: number | string;
}

interface CrearCategoriaUsuariosProps {
  onSubmit: ( payload: CategoriaUsuarios ) => void;
  initialValues?: FormValues;
}

const validationSchema = Yup.object().shape<FormValues>({
  title: Yup.string()
    .required('El campo título es requerido.'),
  priceHigh: Yup.number()
    .required('El campo valor alta es requerido')
    .positive('El campo valor alta debe ser positivo')
    .integer('El campo valor alta debe ser un número entero'),
  priceLow: Yup.number()
    .required('El campo valor baja es requerido')
    .positive('El campo valor baja debe ser positivo')
    .integer('El campo valor baja debe ser un número entero'),
});

export const CrearCategoria: React.FC<CrearCategoriaUsuariosProps> = ({
  onSubmit,
  initialValues = {
    title: '',
    description: '',
    priceHigh: '',
    priceLow: ''
  }
}) => {

  const handleSubmit = ( values: FormValues, { resetForm }: FormikHelpers<FormValues> ) => {
    onSubmit({
      nombre: values.title,
      descripcion: values.description ? values.description : '',
      valorAlta: Number( values.priceHigh ),
      valorBaja: Number( values.priceLow )
    });
    // Reset form
    resetForm();
  };  

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });  


  return (
    <form className="category__form" onSubmit={ formik.handleSubmit } noValidate>
      <h3>Crear categoría de usuarios</h3>
      <label htmlFor="title"><b>Título <div className="required">*</div></b></label>
      <Input
        id="title"
        name="title"
        placeholder="Título de la categoría, por ejemplo: 'Asociados categoría 1'"
        value={ formik.values.title }
        onChange={ formik.handleChange }          
      />
      {formik.touched.title && formik.errors.title && (
        <SpanError>{formik.errors.title}</SpanError>
      )}      

      <label htmlFor="description"><b>Descripción</b></label>
      <TextArea
        rows={ 3 }
        id="description"
        name="description"
        placeholder="Descripción de la categoría, por ejemplo: 'Categoría para asociados seccional Medellín'"
        defaultValue={ formik.values.description }
        onChange={ formik.handleChange }
      ></TextArea>

      <label htmlFor="price_high"><b>Valor temporada alta <div className="required">*</div></b></label>
      <Small>Este campo corresponde al valor en pesos ($) a las fechas festivas/altas por día que están 
        preconfiguradas en el calendario de festivos.</Small>
      <Input
        id="priceHigh"
        name="priceHigh"
        type="number"
        min="0"
        placeholder="Valor para días de temporada alta, por ejemplo: 50000, sin espacios y sin caracteres especiales"
        value={ formik.values.priceHigh }
        onChange={ formik.handleChange }        
      />
      {formik.touched.priceHigh && formik.errors.priceHigh && (
        <SpanError>{formik.errors.priceHigh}</SpanError>
      )}      

      <label htmlFor="price_low"><b>Valor temporada baja <div className="required">*</div></b></label>
      <Small>Este campo corresponde al valor en pesos ($) a las fechas convencionales que el usuario 
        seleccione del calendario.</Small>
      <Input
        id="priceLow"
        name="priceLow"
        type="number"
        min="0"
        placeholder="Valor para días de temporada baja, por ejemplo: 35000, sin espacios y sin caracteres especiales"
        value={ formik.values.priceLow }
        onChange={ formik.handleChange }      
      />
      {formik.touched.priceLow && formik.errors.priceLow && (
        <SpanError>{formik.errors.priceLow}</SpanError>
      )}

      <Button type="submit">Crear categoría de usuarios</Button>
    </form>
  );
};

CrearCategoria.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priceHigh: PropTypes.number.isRequired,
    priceLow: PropTypes.number.isRequired
  }),
};
