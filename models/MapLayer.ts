import Grondplan from '../assets/grondplan/2024_basis.png';
import GrondPlanGrootSpel from '../assets/grondplan/2024_spel.png';
import GrondPlanVrijdag from '../assets/grondplan/2024_vrijdag.png';
import GrondPlanVormingen from '../assets/grondplan/2024_vormingen.png';

export type MapLayer = 'normal' | 'activities' | 'big_game' | 'friday'; //TODO: make layers more dynamic

const getLayerImage = (mapLayer: MapLayer) => {

    switch(mapLayer) {
        case "normal": return Grondplan;
        case "activities": return GrondPlanVormingen;
        case "big_game": return GrondPlanGrootSpel;
        case "friday": return GrondPlanVrijdag;
    }
}

export default getLayerImage;