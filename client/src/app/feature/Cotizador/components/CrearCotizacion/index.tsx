import { CategoriaUsuarios } from 'app/feature/Admin/models/CategoriaUsuarios';
import { CentroVacacional } from 'app/feature/Admin/models/CentroVacacional';
import { Cotizacion } from 'app/feature/Cotizador/models/Cotizacion';
import { Small } from 'app/shared/components/Small';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import moment from 'moment';
import 'moment/locale/es';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import * as Yup from 'yup';
import { Button } from '../../../../shared/components/Button/index';
import { Input } from '../../../../shared/components/Input/index';
import { Select } from '../../../../shared/components/Select/index';
import { SpanError } from '../../../../shared/components/SpanErrors/index';
import { SeleccionCentroVacacional } from './SeleccionCentroVacacional/index';
import { Calendario } from '../../../Admin/models/Calendario';

interface FormValues {
  personas: number;
  categoriaUsuarios: string | number;
}

interface CrearCotizacionProps {
  onSubmit: ( payload: Cotizacion ) => void;
  centrosvacacionales: Array<CentroVacacional>;
  initialValues?: FormValues;
}

const validationSchema = Yup.object().shape<FormValues>({
  personas: Yup.number().required('La cantidad de personas es requerida.')
               .moreThan(0, 'Debe cotizar para por lo menos una persona')
               .integer( 'La cantidad de personas debe ser un número entero' )
               .truncate(),
  categoriaUsuarios: Yup.number().required('Debes seleccionar una categoría de usuario')
});

export const CrearCotizacion: React.FC<CrearCotizacionProps> = ({
  onSubmit,
  centrosvacacionales,
  initialValues = {
    personas: 0,
    categoriaUsuarios: ''
  }
}) => {

  const obtenerDiasAltaCalendario = () => {
    const calendarioActivo = selectedCentroVacacional?.calendarios.find( ( calendario: Calendario ) => {
      return Number( calendario.id ) === Number( selectedCentroVacacional.calendarioActivo );
    } );
    if( ! calendarioActivo ) {
      return undefined;
    }
    return calendarioActivo.festivos.map( festivo => moment( festivo ).toDate() );
  }

  const initialRange = {
    from: undefined,
    to: undefined
  };

  const [ selectedDays, setSelectedDays ] = useState<any>(initialRange);
  const [ selectedCentroVacacional, setSelectedCentroVacacional ] = useState<CentroVacacional>();

  const { from, to } = selectedDays;
  const modifiers = { 
    start: from, 
    end: to,
    diasAlta: obtenerDiasAltaCalendario()
  };

  const handleSubmit = ( values: FormValues, { resetForm }: FormikHelpers<FormValues> ) => {

    if( ! selectedDays.from ){
      return;
    }

    if( ! selectedCentroVacacional ){
      return;
    }

    onSubmit({
      centroVacacional: selectedCentroVacacional.id!,
      categoriaUsuarios: Number( values.categoriaUsuarios ),
      personas: Number( values.personas ),
      fechaInicio: moment( selectedDays.from ).format( 'YYYY-MM-DD' ),
      fechaFin:  moment( selectedDays.to ).format( 'YYYY-MM-DD' )
    });

    // Reset form
    resetFormDynamicContent();
    resetForm();
  };

  /**
   * Guarda festivos del formulario de creación
   */
  const handleDayClick = ( day: Date ) => {
    
    const range = DateUtils.addDayToRange( day, selectedDays );
    setSelectedDays( range );
  };

  const resetFormDynamicContent = () => {
    setSelectedDays(initialRange);
    setSelectedCentroVacacional(undefined);
  };

  const handlerClickSelectionCV = ( centroVacacionalSeleccionado: CentroVacacional ) => {
    setSelectedCentroVacacional( centroVacacionalSeleccionado );
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form className="cotizador__form" onSubmit={ formik.handleSubmit }>
      
      <label htmlFor="title"><b>Centro vacacional { selectedCentroVacacional && <Small className="inline underlined">{ selectedCentroVacacional.nombre }</Small> }</b></label>
      <Small>Seleccione uno de los siguientes Centros Vacacionales</Small>
      {
        centrosvacacionales && centrosvacacionales.length ?
        <>
          <SeleccionCentroVacacional 
            elementos={ centrosvacacionales }
            handlerSeleccion={ handlerClickSelectionCV }
          />
          { ( ! selectedCentroVacacional && ! formik.isValid )  && (
            <SpanError>Debes seleccionar un centro vacacional para continuar</SpanError>
          )}
        </>
        : <p style={{ margin: '15px 0' }}>No hay centros vacacionales actualmente, vuelva en unos segundos o contacte al administrador.</p>
      }

      <label htmlFor="personas"><b>Personas</b></label>
      <Small>Seleccione la cantidad de personas que desean ir al Centro vacacional seleccionado, recuerde, Los menores de edad también cuentan como adulto</Small>
      <Input
        type="number"
        name="personas"
        min="0"
        placeholder="Cantidad de personas"
        id="personas"
        value={ formik.values.personas }
        onChange={formik.handleChange}
      />
      { formik.touched.personas && formik.errors.personas && (
        <SpanError>{formik.errors.personas}</SpanError>
      )}

      <label htmlFor="categoria"><b>Rango salarial</b></label>
      <Small>Seleccione el rango salarial al que pertenece como afiliado de la compañía</Small>
      <Select 
        name="categoriaUsuarios" 
        id="categoria"
        value={ formik.values.categoriaUsuarios }
        onChange={ formik.handleChange }
      >
        <option value="">{ ! selectedCentroVacacional?.categoriaUsuarios ? 'Seleccione primero un centro vacacional' : 'Seleccione un rango salarial' }</option>
      {
        selectedCentroVacacional && selectedCentroVacacional.categoriaUsuarios.map( ( categoriaUsuarios: CategoriaUsuarios ) => 
          <option key={ categoriaUsuarios.id } value={ categoriaUsuarios.id }>{ categoriaUsuarios.nombre }</option>
        )
      }
      </Select>
      { formik.touched.categoriaUsuarios && formik.errors.categoriaUsuarios && (
        <SpanError>{formik.errors.categoriaUsuarios}</SpanError>
      )}

      <label htmlFor="holidays"><b>Rango de fechas de viaje</b></label>
      <Small>Seleccione un día o rango de fechas las cuales desearía reservar en el centro vacacional.</Small>
      <div>
        <DayPicker 
          className="Selectable"
          numberOfMonths={3}
          onDayClick={ handleDayClick }
          selectedDays={[from, { from, to }]}
          modifiers={ modifiers }
          disabledDays={{ before: new Date() }}
          todayButton="Volver a hoy"
          localeUtils={ MomentLocaleUtils }
          locale='es'
        />
      </div>
      { ( ! selectedDays.from && ! formik.isValid ) && (
        <SpanError>Debes seleccionar un rango de fechas para proceder con la cotización</SpanError>
      )}
      <Button type="submit">Crear calendario</Button>
    </form>
  );
};

CrearCotizacion.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    personas: PropTypes.number.isRequired,
    categoriaUsuarios: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }),
};
