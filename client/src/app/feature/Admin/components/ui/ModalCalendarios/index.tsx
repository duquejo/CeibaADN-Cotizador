import 'moment/locale/es';
import 'react-day-picker/lib/style.css';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button } from '../../../../../shared/components/Button/index';
import DayPicker from 'react-day-picker';
import { EstadoGeneral } from '../../../../../core/redux/modelo/EstadoGeneral';
import { Input } from '../../../../../shared/components/Input/index';
import MomentLocaleUtils from 'react-day-picker/moment';
import ReactModal from 'react-modal';
import { TextArea } from '../../../../../shared/components/TextArea/index';
import { cerrarModal } from '../../../../../core/redux/acciones/ui/ModalAcciones';
import { limpiarCalendario } from '../../../../../core/redux/acciones/calendarios/CalendariosAcciones';
import moment from 'moment';
import { tiposModal } from 'app/core/redux/modelo/EstadoUI';
import { useFormik } from 'formik';


if (process.env.NODE_ENV !== 'test') {
    ReactModal.setAppElement('#root');
}

interface FormValues {
    title: string;
    description?: string
}

const validationSchema = Yup.object().shape<FormValues>({
    title: Yup.string().required('El campo título es requerido.')
});

const initialValues: FormValues = {
    title: '',
    description: ''
};

export const ModalCalendarios: React.FC<any> = ({
    handleEditCalendar,
    onSubmit
}) => {

    /**
     * Redux
     */
    const dispatch = useDispatch();
    const { modalOpen, type } = useSelector( ( state: EstadoGeneral ) => state.ui );
    const { calendarioActivo } = useSelector( ( state: EstadoGeneral ) => state.calendarios );
    const [ selectedDays, setSelectedDays] = useState<Date[]>([]);

    /**
     * Submit handler
     */
    const handlerSubmit = (  values: FormValues ) => {
        onSubmit({
            id: calendarioActivo!.id,
            nombre: values.title,
            descripcion: values.description,
            festivos: selectedDays.map( day => moment( day ).format( 'YYYY-MM-DD' ) )
        });
        closeModal();
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
     * Close modal
     */
    const closeModal = () => {
        setSelectedDays([]);
        dispatch( limpiarCalendario() );
        dispatch( cerrarModal() );
        formik.setValues( initialValues );
    };

    /**
     * Guarda festivos del formulario de creación
     */
    const handleDayClick = ( day: Date ) => {
        const filteredArray = selectedDays.filter( selectedDay => 
            moment( selectedDay ).format('YYYY-MM-DD') !== moment( day ).format('YYYY-MM-DD')
        );
        /**
         * Lo elimina si existe
         */
        if( filteredArray.length < selectedDays.length ) {
            setSelectedDays( ( days: Date[] ) => filteredArray );
        } else {
            /**
             * Añade de no existir
             */
            setSelectedDays( ( days: Date[] ) => [
                ...selectedDays, moment( day ).startOf('day').toDate()
            ] );
        }
    };    

    useEffect(() => {

        /**
         * Bugfix infinite loop formik
         */
        if( calendarioActivo && formik.values === initialValues ) {

            /**
             * Update Form
             */
            formik.setValues({
                title: calendarioActivo.nombre,
                description: calendarioActivo.descripcion
            });

            /**
             * Update DayPicker
             */
            setSelectedDays( 
                calendarioActivo.festivos.map( 
                    festivo => moment( festivo ).toDate()
                ) 
            );
        }
    }, [ calendarioActivo, formik ] );

    return (
        <ReactModal
        isOpen={ modalOpen && type === tiposModal.MODAL_CALENDARIOS }
        onRequestClose={ closeModal }
        closeTimeoutMS={ 200 }
        className="modal"
        overlayClassName="modal-fondo">
            {
                calendarioActivo && 
                <>
                    <h2>Editando: <i>{ `"${ formik.values.title.length ? formik.values.title : 'Sin nombre' }"` }</i></h2>
                    <hr/>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="title">
                            <b>Título</b>
                        </label>
                        <Input
                            name="title"
                            placeholder="Título"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="description">
                            <b>Descripción</b>
                        </label>
                        <TextArea
                            rows={ 3 }
                            name="description"
                            placeholder="Descripción"
                            id="description"
                            value={ formik.values.description }
                            onChange={ formik.handleChange }         
                        />                        
                        <label htmlFor="holidays">
                            <b>Festivos</b>
                        </label>
                        <div>
                            <DayPicker 
                                numberOfMonths={3} 
                                selectedDays={ selectedDays }
                                onDayClick={ handleDayClick }
                                localeUtils={MomentLocaleUtils}
                                locale='es'
                            />
                        </div>
                        <Button type="submit">Guardar</Button>
                    </form>     
                </>           
            }
        </ReactModal>
    );
};

ModalCalendarios.propTypes = {
    handleEditCalendar: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};
