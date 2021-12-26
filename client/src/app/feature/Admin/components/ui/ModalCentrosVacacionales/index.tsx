import 'moment/locale/es';
import 'react-day-picker/lib/style.css';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button } from '../../../../../shared/components/Button/index';
import { EstadoGeneral } from '../../../../../core/redux/modelo/EstadoGeneral';
import { ISelectionOptions } from '../../../models/FormSelector';
import { Input } from '../../../../../shared/components/Input/index';
import ReactModal from 'react-modal';
import { Select } from '../../../../../shared/components/Select/index';
import { SelectorMultiple } from '../../centrovacacional/CrearCentroVacacional/SelectorMultiple/index';
import { Small } from '../../../../../shared/components/Small/index';
import { SpanError } from '../../../../../shared/components/SpanErrors/index';
import { cerrarModal } from '../../../../../core/redux/acciones/ui/ModalAcciones';
import { limpiarCentroVacacional } from '../../../../../core/redux/acciones/centrosvacacionales/CentrosVacacionalesAcciones';
import { obtenerCalendarioActivo } from '../../../../../shared/utils/miscfunctions';
import { tiposModal } from 'app/core/redux/modelo/EstadoUI';
import { useFormik } from 'formik';
import { yupConditions } from '../../../../../shared/utils/yupconditions.enum';

if ( process.env.NODE_ENV !== 'test' ) {
    ReactModal.setAppElement('#root');
}

interface FormValues {
    title: string;
    description?: string;
    calendarioActivo?: string | number | undefined;
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
      .max(  yupConditions.maxStringLength, 'No puedes ingresar más de 50 caracteres')
});

const parseObjectToOptions = ( object: any ) => object.map( ( obj: any ) => ({
    value: obj.id,
    label: obj.nombre
}));

export const ModalCentrosVacacionales: React.FC<any> = ({
    handleEditCentroVacacional,
    onSubmit
}) => {


    /**
     * Redux
     */
    const dispatch = useDispatch();
    const { modalOpen, type } = useSelector( ( state: EstadoGeneral ) => state.ui );

    /**
     * El CV activo
     */
    const { centroVacacionalActivo } = useSelector( ( state: EstadoGeneral ) => state.centrosVacacionales );

    /**
     * Todos Calendarios
     */
    const { calendarios: todosCalendarios } = useSelector( ( state: EstadoGeneral ) => state.calendarios );
    const { categoriasUsuarios: todosCategoriasUsuarios } = useSelector( ( state: EstadoGeneral ) => state.categoriasUsuarios );

    /**
     * Controladores internos
     */
    const [ calendariosSeleccionados, setCalendariosSeleccionados] = useState<ISelectionOptions[]>([]);
    const [ categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<ISelectionOptions[]>([]);

    /**
     * Submit handler
     */
    const handlerSubmit = (  values: FormValues ) => {

        const calendarioActivoAuto = obtenerCalendarioActivo( 
            values.calendarioActivo,
            calendariosSeleccionados 
        );
        onSubmit({
            id: centroVacacionalActivo!.id,
            nombre: values.title,
            descripcion: values.description,
            calendarios: calendariosSeleccionados.map( ( calendario: ISelectionOptions ) => calendario.value ),
            categoriaUsuarios: categoriasSeleccionadas.map( ( categoria: ISelectionOptions ) => categoria.value ),
            calendarioActivo: calendarioActivoAuto
        });
        closeModal();
    };


    /**
     * Continuar almacenando los cambios.
     */
    const handlerCalendariosSeleccionados = ( calendarios: ISelectionOptions[] ) => {
        setCalendariosSeleccionados( calendarios );
    };
    
    const handlerCategoriasSeleccionadas = ( categoriasUsuarios: ISelectionOptions[] ) => {
        setCategoriasSeleccionadas( categoriasUsuarios );
    };

    /**
     * Close modal
     */
    const closeModal = () => {
        dispatch( limpiarCentroVacacional() );
        dispatch( cerrarModal() );
        formik.setValues( initialValues );        
    };

    /**
     * Formik config
     */
     const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handlerSubmit
    });

    useEffect(() => {

        /**
         * Bugfix infinite loop formik
         */
        if( centroVacacionalActivo && formik.values === initialValues ) {

            /**
             * Bugfix select modal
             */
             let modCalendarioActivo: any = centroVacacionalActivo.calendarioActivo;
            if( modCalendarioActivo === null ) {
                modCalendarioActivo = '';
            }

            /**
             * Update Form
             */
            formik.setValues({
                title: centroVacacionalActivo.nombre,
                description: centroVacacionalActivo.descripcion,
                calendarioActivo: modCalendarioActivo
            });

            /**
             * Adding preselected values
             */
            setCalendariosSeleccionados( parseObjectToOptions( centroVacacionalActivo.calendarios ) );
            setCategoriasSeleccionadas( parseObjectToOptions( centroVacacionalActivo.categoriaUsuarios ) );
        }
    }, [ centroVacacionalActivo, formik ] );    

    return (
        <ReactModal
        isOpen={ modalOpen && type === tiposModal.MODAL_CENTROS_VACACIONALES }
        onRequestClose={ closeModal }
        closeTimeoutMS={ 200 }
        className="modal"
        ariaHideApp={false}
        overlayClassName="modal-fondo">
            {
                centroVacacionalActivo && 
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
                        { formik.touched.title && formik.errors.title && (
                            <SpanError>{formik.errors.title}</SpanError>
                        )}

                        <label htmlFor="description">
                            <b>Descripción</b>
                        </label>
                        <Input
                            name="description"
                            placeholder="Descripción"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <SpanError>{formik.errors.description}</SpanError>
                        )}

                        <b>Asignación de calendarios de temporadas altas</b>
                        <Small>Dicha asignación le permitirá a los clientes obtener opciones 
                            personalizadas para el centro vacacional según la configuración.</Small>
                        <SelectorMultiple 
                            options={ todosCalendarios }
                            containerClass="selector__container-calendarios"
                            initialvalues={ calendariosSeleccionados }
                            handlerSeleccion={ handlerCalendariosSeleccionados }
                            selectText="Selecciona un calendario de festivos o días de alta"
                        />

                        <b>Asignación de categorías de usuarios</b>
                        <Small>Dicha asignación le permitirá a los clientes obtener opciones 
                        personalizadas según sus rango salarial.</Small>      
                        <SelectorMultiple 
                            options={ todosCategoriasUsuarios }
                            containerClass="selector__container-categorias"
                            initialvalues={ categoriasSeleccionadas }
                            handlerSeleccion={ handlerCategoriasSeleccionadas }
                            selectText="Selecciona las categorías de usuarios"
                        />

                        <label htmlFor="calendarioActivo"><b>Asignación de calendario activo</b></label>
                        <Select 
                            name="calendarioActivo" 
                            id="active_calendar"
                            value={ formik.values.calendarioActivo }
                            onChange={ formik.handleChange }
                        >
                        {
                            calendariosSeleccionados.length === 0 ?
                            <option value="">Selecciona un calendario del listado</option> :
                            <option value="">Seleccionar el primero según selección de temporadas altas</option>
                        }  
                        {
                            calendariosSeleccionados.map( ( calActivo: any ) => 
                            <option key={ calActivo.value } value={ calActivo.value }>{ calActivo.label }</option>
                            )
                        }
                        </Select>                        
                        
                        <Button type="submit">Guardar</Button>
                    </form>     
                </>           
            }
        </ReactModal>
    );
};

ModalCentrosVacacionales.propTypes = {
    handleEditCentroVacacional: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};
