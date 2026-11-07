// =========================================================
// BÓVEDA CENTRAL DE NORMATIVA SUNAT (datos.js)
// Única fuente de verdad: si la ley cambia, edita solo aquí.
// =========================================================

window.BOVEDA_TRIBUTARIA = {

    // =========================================================
    // 1. PARÁMETROS MATEMÁTICOS DE LOS SIMULADORES
    // =========================================================
    simuladores: {
        nrus: {
            minimo: 0,
            maximo: 8000,
            tope_categoria_1: 5000,
            cuota_categoria_1: 20,
            cuota_categoria_2: 50
        },
        alquileres: {
            tasa_efectiva: 0.05,
            maximo_slider: 15000
        }
    },

    // =========================================================
    // 2. FICHAS TÉCNICAS Y REGÍMENES EMPRESARIALES
    // =========================================================
    ficha_alquiler: {
        titulo: "RENTA DE ALQUILER",
        subtitulo: "ARRENDAMIENTO DE PREDIOS Y BIENES (1RA CATEGORÍA)",
        que_pagas: "Pago mensual del 5% efectivo sobre el monto total del alquiler pactado.",
        como_declaras: "Formulario Virtual 1683 (Guía para Arrendamiento) en SUNAT Operaciones en Línea o bancos autorizados."
    },

    regimenes: [
        {
            id: "nrus",
            sigla: "NRUS",
            nombre: "Nuevo RUS",
            que_pagas: "Cuota fija mensual de S/ 20 (Cat. 1) o S/ 50 (Cat. 2). Reemplaza IGV y Renta.",
            como_declaras: "Pago fácil mensual según cronograma SUNAT en bancos autorizados o SUNAT Virtual.",
            limite: "Ingresos o compras hasta S/ 8,000 mensuales o S/ 96,000 anuales."
        },
        {
            id: "rer",
            sigla: "RER",
            nombre: "Régimen Especial",
            que_pagas: "1.5% de tus ingresos netos mensuales (Renta) + 18% de IGV mensual.",
            como_declaras: "Declaración y Pago mensual mediante Declara Fácil 621 en SUNAT Operaciones en Línea.",
            limite: "Ingresos o compras anuales que no superen los S/ 525,000."
        },
        {
            id: "rmt",
            sigla: "RMT",
            nombre: "MYPE Tributario",
            que_pagas: "Pago a cuenta mensual de 1% (hasta 300 UIT) o 1.5%/Coeficiente + 18% IGV + Regularización Anual (10% y 29.5%).",
            como_declaras: "Declara Fácil 621 mensual y Declaración Jurada Anual del Impuesto a la Renta.",
            limite: "Ingresos netos anuales que no superen las 1,700 UIT."
        },
        {
            id: "rg",
            sigla: "RG",
            nombre: "Régimen General",
            que_pagas: "Pago a cuenta mensual (1.5% o coeficiente) + 18% de IGV + Renta Anual del 29.5%.",
            como_declaras: "Declara Fácil 621 mensual y Declaración Jurada Anual del Impuesto a la Renta.",
            limite: "Sin límite de ingresos ni de compras. Apto para todo tipo de actividad."
        }
    ],

    // =========================================================
    // 3. SECCIÓN DE LIBROS CONTABLES OBLIGATORIOS (NRUS, RER, RMT, RG)
    // =========================================================
    libros_contables: {
        nrus: {
            sigla: "NRUS",
            titulo: "En el Nuevo Régimen Único Simplificado - NRUS",
            descripcion: "No hay obligación de llevar libros ni registros contables. Sólo debes conservar los comprobantes de pago que te hubieran emitido y aquellos que sustenten las adquisiciones realizadas, en orden cronológico.",
            tiene_tabla: false,
            lista_directa: []
        },
        rer: {
            sigla: "RER",
            titulo: "En el Régimen Especial de Renta - RER",
            descripcion: "Los libros contables que estarás obligado a llevar son el Registro de Compras y el Registro de Ventas.",
            tiene_tabla: false,
            lista_directa: [
                "Registro de Compras",
                "Registro de Ventas"
            ]
        },
        rmt: {
            sigla: "RMT",
            titulo: "En el Régimen MYPE Tributario - RMT",
            descripcion: "Teniendo en cuenta el nivel de ingresos anuales, los contribuyentes del RMT deberán llevar los siguientes libros y registros contables:",
            tiene_tabla: true,
            encabezado_col1: "Límite de ingresos RMT (artículo 11 del Decreto Legislativo N° 1269)",
            encabezado_col2: "Libros obligados a llevar",
            filas: [
                {
                    limite: "Ingresos Netos hasta 300 UIT",
                    libros: [
                        "Registro de ventas",
                        "Registro de compras",
                        "Libro Diario de Formato Simplificado"
                    ]
                },
                {
                    limite: "Desde 300 UIT hasta 500 UIT de Ingresos Brutos",
                    libros: [
                        "Registro de Ventas",
                        "Registro de Compras",
                        "Libro Diario",
                        "Libro Mayor"
                    ]
                },
                {
                    limite: "Ingresos Brutos mayores a 500 UIT y que no superen las 1,700 UIT",
                    libros: [
                        "Registro de Compras",
                        "Registro de Ventas",
                        "Libro Diario",
                        "Libro Mayor",
                        "Libro de Inventarios y Balances"
                    ]
                }
            ]
        },
        rg: {
            sigla: "RG",
            titulo: "En el Régimen General - RG",
            descripcion: "Los libros contables que estarás obligado a llevar dependerán del volumen de tus ingresos anuales:",
            tiene_tabla: true,
            encabezado_col1: "Límite de ingresos",
            encabezado_col2: "Libros obligados a llevar",
            filas: [
                {
                    limite: "Ingresos Brutos hasta 300 UIT",
                    libros: [
                        "Registro de ventas",
                        "Registro de compras",
                        "Libro Diario de Formato Simplificado"
                    ]
                },
                {
                    limite: "Ingresos Brutos desde 300 UIT hasta 500 UIT",
                    libros: [
                        "Registro de Ventas",
                        "Registro de Compras",
                        "Libro Diario",
                        "Libro Mayor"
                    ]
                },
                {
                    limite: "Ingresos Brutos mayores a 500 UIT y que no superen las 1,700 UIT",
                    libros: [
                        "Registro de Compras",
                        "Registro de Ventas",
                        "Libro Diario",
                        "Libro Mayor",
                        "Libro de Inventarios y Balances"
                    ]
                },
                {
                    limite: "Ingresos Brutos anuales mayores a las 1,700 UIT",
                    texto_plano: "Contabilidad completa, comprende: Libro Caja y Bancos, Libro de Inventarios y Balances, Libro Diario, Libro Mayor, Registro de Ventas y Registro de Compras."
                }
            ]
        }
    },

    // =========================================================
    // 4. SECCIÓN DE TIPOS DE EMPRESAS (SOCIETARIO)
    // =========================================================
    tipos_empresas: {
        titulo: "TIPOS DE EMPRESAS",
        subtitulo: "¿CUÁL TE CONVIENE?",
        lista: [
            {
                sigla: "E.I.R.L.",
                nombre: "Empresa Individual de Responsabilidad Limitada",
                socios: "Un único dueño",
                ideal: "Ideal si no quieres tener socios."
            },
            {
                sigla: "S.R.L.",
                nombre: "Sociedad Comercial de Responsabilidad Limitada",
                socios: "De 2 a 20 Socios",
                ideal: "Ideal para una empresa familiar."
            },
            {
                sigla: "S.A.C.",
                nombre: "Sociedad Anónima Cerrada",
                socios: "De 2 a 20 Socios",
                ideal: "Ideal para una sociedad entre amigos y terceros."
            },
            {
                sigla: "S.A.",
                nombre: "Sociedad Anónima",
                socios: "Mínimo 2 sin límite",
                ideal: "Ideal si se busca cotizar en la bolsa de valores."
            },
            {
                sigla: "S.Civil",
                nombre: "Sociedad Civil",
                socios: "Grupo de Profesionales",
                ideal: "Ideal para una persona natural y jurídica con un fin económico."
            },
            {
                sigla: "S.A.C.S",
                nombre: "Sociedad por Acciones Cerrada Simplificada",
                socios: "De 2 a 20 Socios",
                ideal: "Ideal para emprendedores."
            }
        ]
    }
};