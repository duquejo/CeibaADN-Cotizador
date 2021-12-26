import * as React from 'react';
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { Button } from '../../../../../shared/components/Button/index';
import { ISelectionOptions } from '../../../models/FormSelector';
import { Input } from '../../../../../shared/components/Input/index';
import { Select } from '../../../../../shared/components/Select/index';
import { SelectorMultiple } from './SelectorMultiple/index';
import { Small } from '../../../../../shared/components/Small/index';
import { SpanError } from '../../../../../shared/components/SpanErrors';
import { TextArea } from '../../../../../shared/components/TextArea/index';
import { obtenerCalendarioActivo } from '../../../../../shared/utils/miscfunctions';
import { useState } from 'react';
import { yupConditions } from '../../../../../shared/utils/yupconditions.enum';

interface FormValues {
  title: string;
  description?: string;
  calendarioActivo?: string | number;
}

const initialValues: FormValues = {
  title: '',
  description: '',
  calendarioActivo: ''
};

const validationSchema = Yup.object().shape<FormValues>({
  title: Yup.string().required('El campo título es requerido')
    .min( yupConditions.minStringLength, 'Ingresa un nombre más extenso')
    .max( yupConditions.maxStringLength, 'Sobrepasaste el límite de caracteres'),
  description: Yup.string()
    .max( yupConditions.maxStringLength, 'No puedes ingresar más de 50 caracteres')
});

export const CrearCentroVacacional: React.FC<any> = ({
  onSubmit,
  optionCalendarios,
  optionCategoriasUsuarios
}) => {

  const [ calendariosSeleccionados, setCalendariosSeleccionados] = useState<ISelectionOptions[]>([]);
  const [ categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<ISelectionOptions[]>([]);

  /**
   * Submit handler
   */
  const handlerSubmit = (  values: FormValues, { resetForm }: FormikHelpers<FormValues> ) => {

    const calendarioActivoAuto = obtenerCalendarioActivo( 
      values.calendarioActivo, 
      calendariosSeleccionados 
    );

    onSubmit({
      nombre: values.title,
      descripcion: values.description,
      calendarioActivo: calendarioActivoAuto,
      calendarios: calendariosSeleccionados.map( ( calendario: any ) => Number( calendario.value ) ),
      categoriaUsuarios: categoriasSeleccionadas.map( ( categoriaSeleccionada: any ) => Number( categoriaSeleccionada.value ) ),
    });

    resetForm();
  };  

  /**
   * Formik config
   */
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handlerSubmit
  });  

  /**
   * Continuar almacenando los cambios.
   */

  const handlerCalendariosSeleccionados = ( calendarios: ISelectionOptions[] ) => {
    setCalendariosSeleccionados( calendarios );
  };

  const handlerCategoriasSeleccionadas = ( categorias: ISelectionOptions[] ) => {
    setCategoriasSeleccionadas( categorias );
  };

  return (
    <form className="cv__form" onSubmit={ formik.handleSubmit }>
      <h3>Crear centro vacacional</h3>

      <label htmlFor="cv-title"><b>Título <div className="required">*</div></b></label>
      <Input
        name="title"
        placeholder="Nombre del centro vacacional, ejemplo: 'Cartagena Resort'."
        id="cv-title"
        value={ formik.values.title }
        onChange={ formik.handleChange }        
      />
      { formik.touched.title && formik.errors.title && (
        <SpanError>{formik.errors.title}</SpanError>
      )}

      <label htmlFor="cv-description"><b>Descripción</b></label>
      <TextArea
        rows={ 3 }
        name="description"
        placeholder="Descripción del centro vacacional, ejemplo: 'Pasajes paradisiacos en la costa Colombiana'."
        id="cv-description"
        value={ formik.values.description }
        onChange={ formik.handleChange }         
      />
      {formik.touched.description && formik.errors.description && (
        <SpanError>{formik.errors.description}</SpanError>
      )}      

      <b>Asignación de calendarios de temporadas altas</b>
      <Small>Dicha asignación le permitirá a los administradores tener una visión de los calendarios
      presentes para sus centros vacacionales y configuración de días de manera dinámica.</Small>
      <SelectorMultiple 
        options={ optionCalendarios }
        containerClass="calendarios__container"
        handlerSeleccion={ handlerCalendariosSeleccionados }
        selectText="Selecciona un calendario de festivos o días de alta"
      />

      <b>Asignación de categorías de usuarios</b>
      <Small>Dicha asignación le permitirá a los clientes obtener opciones 
        personalizadas de precios según su nivel salarial.</Small>      
      <SelectorMultiple 
        options={ optionCategoriasUsuarios }
        containerClass="categorias__container"
        handlerSeleccion={ handlerCategoriasSeleccionadas }
        selectText="Selecciona las categorías de usuarios"
      />

      <label htmlFor="calendarioActivo"><b>Asignación de calendario activo</b></label>
      <Small>El calendario activo será el que el cotizador tendrá visible y presente en los cálculos.</Small>
      <Select 
        name="calendarioActivo" 
        id="active_calendar"
        value={ formik.values.calendarioActivo }
        onChange={ formik.handleChange }
      >
        {
          calendariosSeleccionados && calendariosSeleccionados.length === 0 ?
            <option value="">Selecciona un calendario del listado</option> :
            <option value="">Seleccionar el primero según selección de temporadas altas</option>
        }  
        {
          calendariosSeleccionados && calendariosSeleccionados.map( ( calActivo: any ) => 
            <option key={ calActivo.value } value={ calActivo.value }>{ calActivo.label }</option>
          )
        }
      </Select>

      <Button type="submit">Crear</Button>
    </form>
  );
};
