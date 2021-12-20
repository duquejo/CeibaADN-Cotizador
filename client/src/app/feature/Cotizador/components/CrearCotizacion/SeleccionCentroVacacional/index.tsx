import * as React from 'react';
import * as PropTypes from 'prop-types';

import { SwiperContainer, SlideContent, SlideTitle, SlideDescripcion } from './styles';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

import { CentroVacacional } from '../../../../Admin/models/CentroVacacional';

interface SeleccionCentroVacacionalProps {
  elementos: Array<CentroVacacional>;
  handlerSeleccion: ( centroVacacional: CentroVacacional ) => any;
}

export const SeleccionCentroVacacional: React.FC<SeleccionCentroVacacionalProps> = ({ 
    elementos,
    handlerSeleccion
}) => {

    const handlerClick = ( e: React.MouseEvent<HTMLElement>, centroVacacional: CentroVacacional ) => {
        document.querySelectorAll('.swiper-slide').forEach( el => el.classList.remove('selected') );
        e.currentTarget.className += ' selected';
        handlerSeleccion( centroVacacional );
    }

    return elementos ? (
    <SwiperContainer>
        <Swiper
            modules={[ Pagination ]}
            spaceBetween={ 20 }
            slidesPerView={3}
            pagination={true}
        >
        {
            elementos && elementos.map( ( elemento: CentroVacacional ) => (
                <SwiperSlide 
                    key={ elemento.id }
                    onClick={ ( event: React.MouseEvent<HTMLElement> ) => handlerClick( event, elemento ) }
                >
                    <SlideContent>
                        <SlideTitle>{ elemento.nombre }</SlideTitle>
                        <SlideDescripcion>{ elemento.descripcion }</SlideDescripcion>
                    </SlideContent>
                </SwiperSlide>
            ))
        }
        </Swiper>
    </SwiperContainer>
  ) : <h5>No hay centros vacacionales disponibles.</h5>
};

SeleccionCentroVacacional.propTypes = {
    elementos: PropTypes.array.isRequired,
    handlerSeleccion: PropTypes.func.isRequired
};