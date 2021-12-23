import 'moment/locale/es';
import 'react-day-picker/lib/style.css';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { Button } from '../../../../../shared/components/Button/index';
import { Calendario } from 'app/feature/Admin/models/Calendario';
import DayPicker from 'react-day-picker';
import { FormikHelpers } from 'formik/dist/types';
import { Input } from '../../../../../shared/components/Input/index';
import MomentLocaleUtils from 'react-day-picker/moment';
import { Small } from '../../../../../shared/components/Small/index';
import { SpanError } from '../../../../../shared/components/SpanErrors/index';
import { TextArea } from '../../../../../shared/components/TextArea/index';
import moment from 'moment';
import { useFormik } from 'formik';
import { useState } from 'react';

interface FormValues {
  title: string;
  description?: string;
}

interface CrearCalendarioProps {
  onSubmit: ( payload: Calendario ) => void;
  initialValues?: FormValues;
}

const validationSchema = Yup.object().shape<FormValues>({
  title: Yup.string().required('El campo título es requerido.')
});

export const CrearCalendario: React.FC<CrearCalendarioProps> = ({
  onSubmit,
  initialValues = {
    title: '',
    description: ''
  }
}) => {

  const [ selectedDays, setSelectedDays ] = useState<Date[]>([]);

  const handleSubmit = ( values: FormValues, { resetForm }: FormikHelpers<FormValues> ) => {
    onSubmit({
      nombre: values.title,
      descripcion: values.description ? values.description : '',
      festivos: selectedDays.map( day => moment( day ).format( 'YYYY-MM-DD' ) )
    });

    // Reset form
    resetSelectedDays();
    resetForm();
  };

  /**
   * Guarda festivos del formulario de creación
   */
  const handleDayClick = ( day: Date ) => {
    setSelectedDays( ( days: Date[] ) => [
      ...selectedDays, day
    ] );
  };

  const resetSelectedDays = () => {
    setSelectedDays([]);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form className="calendar__form" onSubmit={ formik.handleSubmit }>
      <h3>Crear calendario</h3>
      
      <label htmlFor="title"><b>Título</b></label>
      <Input
        name="title"
        placeholder="Título personalizado del calendario, por ejemplo: 'Calendario de alta afluencia enero'."
        id="title"
        value={ formik.values.title }
        onChange={ formik.handleChange }
      />
      {formik.touched.title && formik.errors.title && (
        <SpanError>{formik.errors.title}</SpanError>
      )}

      <label htmlFor="description"><b>Descripción</b></label>
      <TextArea
        rows={ 3 }
        name="description"
        placeholder="Descripción del calendario. Extienda más información de carácter administrativo del mismo, generando más opciones de recordación o gestión."
        id="description"
        defaultValue={ formik.values.description }
        onChange={formik.handleChange}
      />    

      <label htmlFor="holidays"><b>Selección de festivos/temporada alta</b></label>
      <Small>Seleccione de los siguientes calendarios, los días que corresponda que son festivos o que sean días de temporada alta. El día marcado de
      color rojo corresponde al día actual.</Small>
      <div>
        <DayPicker 
          numberOfMonths={3}
          onDayClick={ handleDayClick }
          selectedDays={ selectedDays }
          disabledDays={{ before: new Date() }}
          localeUtils={ MomentLocaleUtils }
          locale='es'
        />
      </div>
      <Button type="submit">Crear calendario</Button>
    </form>
  );
};

CrearCalendario.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
};
