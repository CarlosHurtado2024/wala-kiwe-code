import * as XLSX from 'xlsx';

export function exportToExcel(data: any[], filename: string = "reporte_censo.xlsx") {
    // Flatten the data for Excel
    const flattenedData = data.map(item => ({
        "Nombres": `${item.primer_nombre || ''} ${item.segundo_nombre || ''}`.trim() || item.nombres,
        "Apellidos": `${item.primer_apellido || ''} ${item.segundo_apellido || ''}`.trim() || item.apellidos,
        "Tipo Documento": item.tipo_documento,
        "Número Documento": item.numero_documento,
        "Género": item.genero,
        "Fecha Nacimiento": item.fecha_nacimiento,
        "Ubicación": item.direccion_actual,
        "Ocupación": item.ocupacion,
        "Escolaridad": item.nivel_escolaridad,
        "Régimen Salud": item.regimen_salud,
        "EPS": item.eps,
        "Habla Nasayuwe": item.habla_nasayuwe,
        "Autoridad Actual": item.es_autoridad_actualmente ? `SÍ (${item.cargo_autoridad})` : 'NO',
        "Fue Autoridad": item.ha_sido_autoridad ? 'SÍ' : 'NO'
    }));

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Comuneros");

    // Generate buffer and trigger download
    XLSX.writeFile(workbook, filename);
}
