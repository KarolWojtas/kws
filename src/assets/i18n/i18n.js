import { I18n } from '@aws-amplify/core';

export const dict = {
    'pl':{
        //Navigation
        'Navigation-home-btn': 'Strona główna',
        'Navigation-menu-btn': 'Menu',
        'Navigation-reservations-btn': 'Rezerwacje',
        //ReservationsPage
        'ReservationsPage-selected-seats-title': 'Liczba miejsc wybranych',
        'ReservationsPage-selected-date-title': 'Wybierz datę',
        'ReservationsPage-selected-time-title': 'Wybierz godzinę',
        'ReservationsPage-calendar-dialog-close': 'Zamknij',
        'ReservationsPage-finalize-reservation-btn': 'Zarezerwuj',
        'ReservationsPage-choose-time-placeholder': 'Nie wybrano godziny',
        'ReservationsPage-choose-seats-placeholder': 'Nie wybrano żadnych miejsc',
        'ReservationsPage-no-reservations-available': 'Nie można rezerwować już dzisiaj',
        //MainPage
        'MainPage-menu-title': 'Menu',
        'MainPage-menu-content': 'Zobacz nasze menu',
        //MenuPage
        //Kategorie
        'MenuPage-breakfast-category-title': 'Śniadania',
        'MenuPage-breakfast-category-subtitle': 'Podajemy do 12',
        'MenuPage-pasta-category-title': 'Makarony',
        'MenuPage-kids-category-title': 'Menu dziecięce',
        'MenuPage-soupsalads-category-title': 'Sałatki i zupy',
        'MenuPage-soup-category-title': 'Zupy',
        'MenuPage-salads-category-title': 'Sałatki',
        'MenuPage-drinks-category-title': 'Napoje',
        'MenuPage-cold-category-title': 'Napoje zimne',
        'MenuPage-coffee-category-title': 'Kawy',
        'MenuPage-tea-category-title': 'Herbaty',
        'MenuPage-season-category-title': 'Menu sezonowe',
        //Podkategorie
        'MenuPage-breakfast-omlet-title': 'Omlety',
        'MenuPage-breakfast-omlet-description': 'Każdy omlet jest podawany w towarzystwie trzech sosów',
        //Omlety wypisane
        'MenuPage-breakfast-omlet-1': 'Łosoś wędzony, szpinak, koperek',
        'MenuPage-breakfast-omlet-2': 'Chorizo, papryka mix, ser Grana Padano',
        'MenuPage-breakfast-omlet-3': 'Chrupiący bekon, pieczarki portobello, pietruszka, puszysta śmietana, syrop klonowy',
        'MenuPage-breakfast-omlet-4': 'Pomidorki koktajlowe, ser Grana Padano, szczypiorek',
        'MenuPage-breakfast-omlet-5': 'Marmolada, Nutella, śmietanka',
        //Bajgle wypisane :-(
        'MenuPage-breakfast-bagel-title': 'Bajgle',
        'MenuPage-breakfast-bagel-description': ' ',
        'MenuPage-breakfast-bagel-1': 'Jajo, serrano, awokado, szczypiorek, sos aioli',
        'MenuPage-breakfast-bagel-2': 'Jajo, bekon, ser provolone, szczypiorek, sos aioli',
        'MenuPage-breakfast-bagel-3': 'Jajo, szpinak, łosoś, twarożek kremowy, koperek',
        'MenuPage-breakfast-bagel-4': 'Jajo, pomidory suszone, rukola, oliwki czarne, prosciutto, mozzarella, sos kaparowy',
        'MenuPage-breakfast-bagel-5': 'Pasta jajeczna, pasta twarogowa, pasta z makreli + maseło i szczypiorek',
        'MenuPage-breakfast-bagel-6': 'Marmolada, czekolada, śmietana',
        //Makarony
        'MenuPage-pasta-1-title':'Kura Olio',
        'MenuPage-pasta-1-description':'Penne, polędwiczki z kurczaka, suszone pomidory, szalotka, czosnek, bazylia, Grana Padano, oliwa',
        'MenuPage-pasta-2-title':'Orzechowe Spaghetti',
        'MenuPage-pasta-2-description':'Spaghetti, chrupiąca polędwiczka z kurczaka, dymka, czosnek, imbir, chilli, kiełki fasoli, sałata rzymska, sos orzechowy',
        'MenuPage-pasta-3-title':'Sztejk',
        'MenuPage-pasta-3-description':'Czwerwone tagliatelle, stek z rosbefu 200g, kapary, szalotka, czosnek, czerwone wino, rukola, sos pieprzowy, balsamico',
        'MenuPage-pasta-4-title':'Łosoś',
        'MenuPage-pasta-4-description':'Zielone tagliatelle, grillowany stek z łososia 200g, sos porowo-selerowy',
        'MenuPage-pasta-5-title':'Krewetka',
        'MenuPage-pasta-5-description':'Czarne tagliatelle, krewetki, szalotka, czosnek, chilli, bekon, czerwone wino, pietruszka, sok z limonki, sos rybny',
        'MenuPage-pasta-6-title':'Portobello',
        'MenuPage-pasta-6-description':'Kopytka, pieczarki portobello, szalotka, czosnek, rozmaryn, śmietana',
        'MenuPage-pasta-7-title':'Szpinak',
        'MenuPage-pasta-7-description':'Czerwone tagliatelle, szalotka, czosnek, szpinak, śmietana, Grana Padano',
        'MenuPage-pasta-8-title':'Bolognese',
        'MenuPage-pasta-8-description':'Spaghetti, sos boloński, bazylia, Grana Padano',
        'MenuPage-pasta-9-title':'Kluski z makiem',
        'MenuPage-pasta-9-description':'Strozzapreti All \'Uovo, mak, bakalie, miód, wanilia',
        'MenuPage-pasta-10-title':'Leniwe',
        'MenuPage-pasta-10-description':'Kluski leniwe, śmietana, cukier brązowy, masło, cynamon',
        //Zupy i sałatki
        'MenuPage-soup-1-title': 'Wszystkie',
        'MenuPage-soup-1-description': 'Zapytaj kelnera co dzisiaj w garnku szmera',
        'MenuPage-salads-1-title': 'Cezar',
        'MenuPage-salads-1-description': 'Grillowane polędwiczki z kurczaka, sałata rzymska, pomidorki koktajlowe, grzanki czosnkowe, Grana Padano, sos winegret',
        'MenuPage-salads-2-title':'Sałatka Chefa',
        'MenuPage-salads-2-description':'Zapytaj co nam w ogródku urosło',
        //Menu dziecięce
        'MenuPage-kids-1-title':'Pulpeciki Chefa Grzesia',
        'MenuPage-kids-1-description':'Penne, pulpeciki wieprzowe, sos pomidorowy, ser Grana Padano',
        'MenuPage-kids-2-title':'Chrupiące Canelloni',
        'MenuPage-kids-2-description':'Kluski leniwe, śmietana, cukier brązowy, masło, cynamon',
        //Napoje zimne
        'MenuPage-cold-1-title':'Coca-Cola/Zero 250ml',
        'MenuPage-cold-1-description':' ',
        'MenuPage-cold-2-title':'Fanta 250ml',
        'MenuPage-cold-2-description':' ',
        'MenuPage-cold-3-title':'Sprite 250ml',
        'MenuPage-cold-3-description':' ',
        'MenuPage-cold-4-title':'Kinley Bitter Lemon 250ml',
        'MenuPage-cold-4-description':' ',
        'MenuPage-cold-5-title':'Cappy',
        'MenuPage-cold-5-description':'jabłko/pomarańcza',
        'MenuPage-cold-6-title':'Fuzetea 250ml',
        'MenuPage-cold-6-description':'cytryna/brzoskwinia',
        'MenuPage-cold-7-title':'Kropla Beskidu 330ml',
        'MenuPage-cold-7-description':'gaz./niegaz.',
        'MenuPage-cold-8-title':'Sok świeżo wyciskany',
        'MenuPage-cold-8-description':'Zapytaj kelnera co dzisiaj wyciskamy',
        'MenuPage-cold-9-title':'Smoothie',
        'MenuPage-cold-9-description':'Zapytaj kelnera co dzisiaj miksujemy',
        //Herbaty
        'MenuPage-tea-1-title': 'Wszystkie',
        'MenuPage-tea-1-description': 'Zapytaj kelnera co dzisiaj parzymy',
        //Kawy
        'MenuPage-coffee-1-title':'Espresso',
        'MenuPage-coffee-1-description':' ',
        'MenuPage-coffee-2-title':'Podwójne Espresso',
        'MenuPage-coffee-2-description':' ',
        'MenuPage-coffee-3-title':'Americano',
        'MenuPage-coffee-3-description':' ',
        'MenuPage-coffee-4-title':'Latte',
        'MenuPage-coffee-4-description':' ',
        'MenuPage-coffee-5-title':'Flat White',
        'MenuPage-coffee-5-description':' ',
        
        //MenuNav
        'MenuNav-menu-button-title': 'Wybierz kategorię'
    },
    'en':{
        'MainPage-menu-title': 'Menu',
        'MainPage-menu-content': 'Check out our menu',
        //MenuNav
        'MenuNav-menu-button-title': 'Choose category'
    }
}

