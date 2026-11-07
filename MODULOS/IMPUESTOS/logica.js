// =========================================================
// 1. INICIALIZACIÓN GENERAL DEL MÓDULO E INYECCIÓN DE VISTAS
// =========================================================

window.inicializarModuloImpuestos = function() {
    inyectarTarjetasRegimenes();
    inyectarFichaAlquiler();
    inicializarSimuladorNRUS();
    inicializarSimuladorAlquiler();
};

function inyectarTarjetasRegimenes() {
    const contenedor = document.getElementById('contenedor-tarjetas-regimenes');
    if (!contenedor || !window.BOVEDA_TRIBUTARIA) return;

    contenedor.innerHTML = window.BOVEDA_TRIBUTARIA.regimenes.map(item => `
        <article class="tarjeta-regimen ${item.id}">
            <div class="cabecera-regimen">
                <h2>${item.sigla}</h2>
                <span>${item.nombre}</span>
            </div>
            <div class="cuerpo-regimen">
                <div class="bloque-normativo">
                    <strong>¿QUÉ PAGAS?</strong>
                    <p>${item.que_pagas}</p>
                </div>
                <div class="bloque-normativo">
                    <strong>¿CÓMO DECLARAS?</strong>
                    <p>${item.como_declaras}</p>
                </div>
                <div class="bloque-normativo">
                    <strong>LÍMITE</strong>
                    <p>${item.limite}</p>
                </div>
            </div>
            <button type="button" class="btn-libros-tarjeta" onclick="abrirModalLibros('${item.id}')">
                <span>📚</span> Ver Libros Contables
            </button>
        </article>
    `).join('');
}

function inyectarFichaAlquiler() {
    const contenedor = document.getElementById('contenedor-ficha-alquiler');
    if (!contenedor || !window.BOVEDA_TRIBUTARIA) return;

    const ficha = window.BOVEDA_TRIBUTARIA.ficha_alquiler;

    contenedor.innerHTML = `
        <h3 class="ficha-alquiler-titulo">${ficha.titulo}</h3>
        <span class="ficha-alquiler-sub">${ficha.subtitulo}</span>
        <div class="cuerpo-regimen">
            <div class="bloque-normativo">
                <strong>¿QUÉ PAGAS?</strong>
                <p>${ficha.que_pagas}</p>
            </div>
            <div class="bloque-normativo">
                <strong>¿CÓMO DECLARAS?</strong>
                <p>${ficha.como_declaras}</p>
            </div>
        </div>
    `;
}

window.alternarModoSimulador = function(modo) {
    const btnNrus = document.getElementById('tab-nrus');
    const btnAlquiler = document.getElementById('tab-alquiler');
    const panelNrus = document.getElementById('panel-modo-nrus');
    const panelAlquiler = document.getElementById('panel-modo-alquiler');

    if (!btnNrus || !btnAlquiler || !panelNrus || !panelAlquiler) return;

    if (modo === 'nrus') {
        btnNrus.classList.add('active');
        btnAlquiler.classList.remove('active');
        panelNrus.classList.remove('oculto');
        panelAlquiler.classList.add('oculto');
    } else {
        btnAlquiler.classList.add('active');
        btnNrus.classList.remove('active');
        panelAlquiler.classList.remove('oculto');
        panelNrus.classList.add('oculto');
    }
};

// =========================================================
// 2. MOTOR MATEMÁTICO: NUEVO RUS Y RENTA DE ALQUILER
// =========================================================

function inicializarSimuladorNRUS() {
    const slider = document.getElementById('input-range-nrus');
    const burbuja = document.getElementById('burbuja-nrus');
    const numeroBurbuja = document.getElementById('numero-burbuja-nrus');
    const estadoPreseleccion = document.getElementById('estado-preseleccion-nrus');
    const btnFijar = document.getElementById('btn-accion-fijar');

    const tituloMontoFijado = document.getElementById('titulo-monto-fijado');
    const subtituloCategoria = document.getElementById('subtitulo-categoria-nrus');
    const valorCuota = document.getElementById('valor-cuota-nrus');

    if (!slider || !window.BOVEDA_TRIBUTARIA) return;
    const parametros = window.BOVEDA_TRIBUTARIA.simuladores.nrus;

    function actualizarPosicionRegla(valor, requiereConfirmacion) {
        const monto = Number(valor);
        const porcentaje = ((monto - parametros.minimo) / (parametros.maximo - parametros.minimo)) * 100;

        numeroBurbuja.textContent = monto.toLocaleString('es-PE');
        burbuja.style.left = `calc(${porcentaje}% + (${15 - porcentaje * 0.3}px))`;

        const colorBarra = monto <= parametros.tope_categoria_1 ? '#14b8a6' : '#f59e0b';
        slider.style.background = `linear-gradient(90deg, ${colorBarra} 0%, #0ea5e9 ${porcentaje}%, #1e293b ${porcentaje}%)`;

        if (requiereConfirmacion) {
            estadoPreseleccion.textContent = `Preseleccionado: S/ ${monto.toLocaleString('es-PE')} (Pulsa Fijar)`;
            btnFijar.classList.add('por-confirmar');
        }
    }

    function confirmarCalculoNRUS() {
        const monto = Number(slider.value);
        btnFijar.classList.remove('por-confirmar');

        tituloMontoFijado.textContent = `Monto fijado: S/ ${monto.toLocaleString('es-PE')}`;
        estadoPreseleccion.textContent = `✔ Confirmado: S/ ${monto.toLocaleString('es-PE')}`;

        if (monto === 0) {
            valorCuota.textContent = 'S/ 0.00';
            subtituloCategoria.textContent = 'Sin ingresos ni compras en el mes';
        } else if (monto <= parametros.tope_categoria_1) {
            valorCuota.textContent = `S/ ${parametros.cuota_categoria_1.toFixed(2)}`;
            subtituloCategoria.textContent = 'Categoría 1 · Hasta S/ 5,000 mensuales';
        } else {
            valorCuota.textContent = `S/ ${parametros.cuota_categoria_2.toFixed(2)}`;
            subtituloCategoria.textContent = 'Categoría 2 · De S/ 5,001 a S/ 8,000 mensuales';
        }
    }

    slider.addEventListener('input', (e) => {
        actualizarPosicionRegla(e.target.value, true);
    });

    btnFijar.addEventListener('click', confirmarCalculoNRUS);

    actualizarPosicionRegla(slider.value, false);
    confirmarCalculoNRUS();
}

function inicializarSimuladorAlquiler() {
    const inputManual = document.getElementById('input-alquiler-manual');
    const sliderAlquiler = document.getElementById('input-range-alquiler');
    const cifraImpuesto = document.getElementById('valor-impuesto-alquiler');
    const detalleExacto = document.getElementById('detalle-exacto-alquiler');

    if (!inputManual || !sliderAlquiler || !window.BOVEDA_TRIBUTARIA) return;
    const paramsAlquiler = window.BOVEDA_TRIBUTARIA.simuladores.alquileres;

    function recalcularAlquiler(valorEntrada) {
        const montoBase = Math.max(0, Number(valorEntrada) || 0);
        const impuestoExacto = montoBase * paramsAlquiler.tasa_efectiva;
        const impuestoCentimos = Math.round(impuestoExacto * 100) / 100;
        const impuestoRedondeadoSUNAT = Math.round(impuestoCentimos);

        cifraImpuesto.textContent = `S/ ${impuestoRedondeadoSUNAT.toLocaleString('es-PE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;

        if (detalleExacto) {
            detalleExacto.textContent = `5% exacto: S/ ${impuestoCentimos.toFixed(2)} · Redondeado SUNAT: S/ ${impuestoRedondeadoSUNAT}.00`;
        }

        const porcentaje = Math.min(100, (montoBase / paramsAlquiler.maximo_slider) * 100);
        sliderAlquiler.style.background = `linear-gradient(90deg, #0ea5e9 0%, #14b8a6 ${porcentaje}%, #1e293b ${porcentaje}%)`;
    }

    inputManual.addEventListener('input', (e) => {
        sliderAlquiler.value = Math.min(paramsAlquiler.maximo_slider, Number(e.target.value) || 0);
        recalcularAlquiler(e.target.value);
    });

    sliderAlquiler.addEventListener('input', (e) => {
        inputManual.value = e.target.value;
        recalcularAlquiler(e.target.value);
    });

    recalcularAlquiler(inputManual.value);
}

// =========================================================
// 3. CONTROLADOR DE VENTANAS MODALES (LIBROS CONTABLES Y SOCIEDADES)
// =========================================================

window.abrirModalLibros = function(idRegimen) {
    const modal = document.getElementById('modal-universal-tuconta');
    const badge = document.getElementById('modal-badge');
    const titulo = document.getElementById('modal-titulo-principal');
    const cuerpo = document.getElementById('modal-contenido-dinamico');

    if (!modal || !window.BOVEDA_TRIBUTARIA) return;
    const dataLibros = window.BOVEDA_TRIBUTARIA.libros_contables[idRegimen];
    if (!dataLibros) return;

    badge.textContent = 'OBLIGACIONES CONTABLES SUNAT';
    titulo.textContent = dataLibros.titulo;

    const botonesSelector = ['nrus', 'rer', 'rmt', 'rg'].map(clave => {
        const item = window.BOVEDA_TRIBUTARIA.libros_contables[clave];
        const claseActivo = clave === idRegimen ? 'activo' : '';
        return `<button type="button" class="pill-regimen-modal ${claseActivo}" onclick="abrirModalLibros('${clave}')">${item.sigla}</button>`;
    }).join('');

    let contenidoEspecifico = '';

    if (dataLibros.tiene_tabla) {
        const filasHTML = dataLibros.filas.map(fila => {
            const celdaDerecha = fila.libros
                ? `<ul class="lista-ul-libros">${fila.libros.map(lib => `<li>${lib}</li>`).join('')}</ul>`
                : `<p>${fila.texto_plano}</p>`;
            return `
                <tr>
                    <td>${fila.limite}</td>
                    <td>${celdaDerecha}</td>
                </tr>
            `;
        }).join('');

        contenidoEspecifico = `
            <table class="tabla-libros-sunat">
                <thead>
                    <tr>
                        <th>${dataLibros.encabezado_col1}</th>
                        <th>${dataLibros.encabezado_col2}</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasHTML}
                </tbody>
            </table>
        `;
    } else if (dataLibros.lista_directa && dataLibros.lista_directa.length > 0) {
        contenidoEspecifico = `
            <div class="lista-libros-directa">
                ${dataLibros.lista_directa.map(libro => `<span class="chip-libro-obligatorio">✔ ${libro}</span>`).join('')}
            </div>
        `;
    }

    cuerpo.innerHTML = `
        <div class="selector-regimenes-modal">
            ${botonesSelector}
        </div>
        <div class="intro-libros-modal">
            <strong>${dataLibros.titulo}:</strong> ${dataLibros.descripcion}
        </div>
        ${contenidoEspecifico}
    `;

    modal.classList.remove('oculto');
};

window.abrirModalSociedades = function() {
    const modal = document.getElementById('modal-universal-tuconta');
    const badge = document.getElementById('modal-badge');
    const titulo = document.getElementById('modal-titulo-principal');
    const cuerpo = document.getElementById('modal-contenido-dinamico');

    if (!modal || !window.BOVEDA_TRIBUTARIA) return;
    const infoSociedades = window.BOVEDA_TRIBUTARIA.tipos_empresas;

    badge.textContent = infoSociedades.titulo;
    titulo.textContent = `${infoSociedades.titulo}: ${infoSociedades.subtitulo}`;

    const tarjetasHTML = infoSociedades.lista.map(emp => `
        <article class="tarjeta-sociedad">
            <div>
                <h3 class="sigla-sociedad">${emp.sigla}</h3>
                <p class="nombre-sociedad">${emp.nombre}</p>
            </div>
            <div>
                <span class="badge-socios-ambar">${emp.socios}</span>
                <p class="ideal-sociedad">${emp.ideal}</p>
            </div>
        </article>
    `).join('');

    cuerpo.innerHTML = `
        <div class="grid-tipos-empresas">
            ${tarjetasHTML}
        </div>
    `;

    modal.classList.remove('oculto');
};

window.cerrarModalUniversal = function() {
    const modal = document.getElementById('modal-universal-tuconta');
    if (modal) modal.classList.add('oculto');
};

window.cerrarModalPorFondo = function(evento) {
    if (evento.target && evento.target.id === 'modal-universal-tuconta') {
        cerrarModalUniversal();
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModalUniversal();
});