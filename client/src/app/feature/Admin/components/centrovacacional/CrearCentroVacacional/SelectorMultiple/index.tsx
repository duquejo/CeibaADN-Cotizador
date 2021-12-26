import * as React from 'react';
import { useEffect, useState } from 'react';

import { MultiSelect } from 'react-multi-select-component';


export const SelectorMultiple: React.FC<any> = ({
    options,
    handlerSeleccion,
    containerClass,
    selectText,
    initialvalues = []
}) => {

    const selectOptions = options ? options.map( ( option: any ) => {
        return {
            label: option.nombre,
            value: option.id
        };
    }) : [{}];

    const [ elements, setElements ] = useState(initialvalues);

    const overrideStrings = {
        'allItemsAreSelected': 'Todos los elementos están seleccionados',
        'clearSearch': 'Limpiar búsqueda',
        'clearSelected': 'Limpiar selección',
        'noOptions': 'No hay opciones',
        'search': 'Buscar',
        'selectAll': 'Seleccionar todos',
        'selectAllFiltered': 'Seleccionar todos',
        'selectSomeItems': selectText,
        'create': selectText,
    };

    useEffect(() => {
        if( elements ) {
            handlerSeleccion( elements );
        }
    }, [ elements, handlerSeleccion ]);
    return (
        <>
            <MultiSelect
                options={ selectOptions }
                className={ `selector__container ${ containerClass ? containerClass : ''}` }
                value={ elements }
                onChange={ setElements }
                labelledBy="Seleccionar"
                overrideStrings={ overrideStrings }
            />
        </>
    );
};
