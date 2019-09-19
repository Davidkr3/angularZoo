export class Const {
    public static roleDictionary = {
        "GUEST": "GUEST",
        "ACTIVITIES_MANAGER": "ACTIVITIES_MANAGER",
        "VISITOR_ESTIMATE_MANAGER": "VISITOR_ESTIMATE_MANAGER",
        "SPECIAL_OFFER_MANAGER": "SPECIAL_OFFER_MANAGER",
        "ACCESS_AUTH_MANAGER": "ACCESS_AUTH_MANAGER",        
        "EDUCATION_MANAGER": "EDUCATION_MANAGER",
        "PARK_AFFECTIONS_MANAGER": "PARK_AFFECTIONS_MANAGER",
        "ACTS_ACTIVITIES_MANAGER": "ACTS_ACTIVITIES_MANAGER",
        "SUPER_ADMIN_READER": "SUPER_ADMIN_READER",
        "SUPER_ADMIN_WRITER": "SUPER_ADMIN_WRITER",
        "ANIMAL_MANAGER": {
            1: "MAMMAL_MANAGER",
            3: "FARM_MANAGER",
            6: "TERRARIUM_MANAGER",
            2: "NORTH_GENERAL_COLLECTION_MANAGER",
            7: "SOUTH_GENERAL_COLLECTION_MANAGER",
            4: "PRIMATE_MANAGER",
            5: "AVIARY_MANAGER",
        },
        "CONCESSIONS_MANAGER": {
            0: "RESTORATION_MANAGER",
            1: "PONIES_MANAGER",
            2: "PHOTO_SERVICE_MANAGER",
            3: "WELLINGTON_MANAGER",
            4: "PRIM_MANAGER",
            5: "ELECTRIC_VEHICLE_RENTING_MANAGER",
            6: "TRAIN_MANAGER",
            7: "PHOTOMATON_MANAGER"
        }
    };

    public static calendarBehaviour = {
        "DEFAULT": 'default',
        "CUSTOM": 'custom',
        "NONE": ''
    };
    public static calendarSize = {
        "SMALL": true,
        "BIG": false
    };

    public static colors =
    {        
        "color": "#D3D3D3",
        "colorAlert": "#FF0000",
        "colorOK": "#66C166",
        "colorPending":"#FFFF00"
    }
}

export class DatepickerLocale {

    public static ca = {
        closeText: "Tanca",
        prevText: "Anterior",
        nextText: "Següent",
        currentText: "Avui",
        monthNames: ["gener", "febrer", "març", "abril", "maig", "juny",
            "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
        monthNamesShort: ["gen", "feb", "març", "abr", "maig", "juny",
            "jul", "ag", "set", "oct", "nov", "des"],
        dayNames: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
        dayNamesShort: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
        dayNamesMin: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
        weekHeader: "Set",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };

    public static en = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };

    public static es = {
        closeText: "Cerrar",
        prevText: "&#x3C;Ant",
        nextText: "Sig&#x3E;",
        currentText: "Hoy",
        monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun",
            "jul", "ago", "sep", "oct", "nov", "dic"],
        dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
        dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
        dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };

}