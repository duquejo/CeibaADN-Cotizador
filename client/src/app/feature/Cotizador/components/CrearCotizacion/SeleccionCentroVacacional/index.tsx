import * as React from 'react';
import * as PropTypes from 'prop-types';

// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

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
    };

    return elementos ? (
    <div className="swiperContainer">
        <Swiper
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
                    <article className="slideContent">
                        <div className="slideTitle">{ elemento.nombre }</div>
                        <div className="slideDescripcion">{ elemento.descripcion }</div>
                    </article>
                </SwiperSlide>
            ))
        }
        </Swiper>
    </div>
  ) : ( <h5>No hay centros vacacionales disponibles.</h5> );
};

SeleccionCentroVacacional.propTypes = {
    elementos: PropTypes.array.isRequired,
    handlerSeleccion: PropTypes.func.isRequired
};
