import { combineReducers } from 'redux';

import calendarios from './calendarios/calendariosReductor';
import categoriasUsuarios from './categoriasusuarios/categoriaUsuariosReductor';
import centrosVacacionales from './centrosvacacionales/centrosVacacionalesReductor';
import ui from './ui/modalReductor';

export default combineReducers({
    calendarios, 
    categoriasUsuarios,
    centrosVacacionales,
    ui
});
