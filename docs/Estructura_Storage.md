# Estructura de Almacenamiento (Supabase Storage) para WalaKiwe

El sistema WalaKiwe utiliza un único _Bucket_ privado llamado **`walakiwe_documentos`**. 
Dado que los buckets de Supabase no funcionan como un sistema de archivos tradicional con carpetas físicas reales, la "estructura de carpetas" se maneja mediante convención de nombres en las rutas de los archivos (`paths`).

La siguiente es la convención jerárquica estandarizada que el cliente (Frontend) debe seguir al subir e interactuar con archivos:

## Raíz: `walakiwe_documentos` (Bucket)

### 1. Comuneros (`comuneros/{comunero_id}/...`)
Archivos personales, confidenciales y vinculados directamente a la hoja de vida de un comunero específico.

*   **Identidad:** `comuneros/{comunero_id}/identidad/`
    *   *Ejemplo:* `comuneros/uuid-1234/identidad/documento_identidad.pdf`
    *   *Uso:* Copias de cédula, certificados de nacimiento, actas de bautismo o registro civil.
*   **Salud (Promotoría):** `comuneros/{comunero_id}/salud/`
    *   *Ejemplo:* `comuneros/uuid-1234/salud/historia_clinica_2026.pdf`
    *   *Uso:* Fichas médicas, diagnósticos occidentales o de medicina tradicional, esquemas de vacunación.
*   **Justicia Propia:** `comuneros/{comunero_id}/justicia/`
    *   *Ejemplo:* `comuneros/uuid-1234/justicia/acta_compromiso.png`
    *   *Uso:* Documentación ligada a expedientes donde este comunero es el implicado principal.

### 2. Tierras y Catastro Propio (`predios/{predio_id}/...`)
Documentación asociada a las parcelas, linderos y adjudicaciones del territorio.

*   **Adjudicaciones:** `predios/{predio_id}/adjudicaciones/`
    *   *Ejemplo:* `predios/uuid-5678/adjudicaciones/acta_posesion_2023.pdf`
    *   *Uso:* Actas notariales o asamblearias donde se adjudica el predio a una familia.
*   **Geografía/Mapas:** `predios/{predio_id}/mapas/`
    *   *Ejemplo:* `predios/uuid-5678/mapas/levantamiento_topografico.pdf`
    *   *Uso:* Archivos CAD exportados a PDF, o imágenes satelitales suplementarias a PostGIS.

### 3. Documentación Oficial y Secretaría (`resguardo/...`)
Documentos macro que pertenecen al resguardo como entidad comunitaria, y no a una persona individual en específico.

*   **Actas de Asamblea:** `resguardo/actas_asamblea/{AÑO}/`
    *   *Ejemplo:* `resguardo/actas_asamblea/2026/acta_eleccion_cabildo.pdf`
*   **Estatutos y Leyes:** `resguardo/normativa/`
    *   *Ejemplo:* `resguardo/normativa/Estatuto_Interno_WalaKiwe.pdf`
    *   *Uso:* Repositorio RAG. Estos son los documentos base que consumirá la Inteligencia Artificial del Módulo 7.

### 4. Gestión Financiera SGP (`finanzas/{presupuesto_id}/...`)
Documentación de respaldos fiscales, controlaría local y rendición de cuentas, organizada por el rubro del sistema general de participaciones.

*   **Comprobantes:** `finanzas/{presupuesto_id}/comprobantes/`
    *   *Ejemplo:* `finanzas/uuid-9999/comprobantes/factura_compra_puestos_salud.pdf`
    *   *Uso:* Recibos, facturas, comprobantes de egreso.
*   **Rendición:** `finanzas/{presupuesto_id}/informes/`
    *   *Ejemplo:* `finanzas/uuid-9999/informes/rendicion_cuentas_Q1.pdf`

---

## Políticas Implementadas en Base de Datos (RLS)

- El bucket es de acceso **Privado** (`public = false`).
- Sólo las personas con una sesión activa en la aplicación (usuarios de Next.js que pasan el check de Supabase Auth) pueden ver o subir los archivos.
- Las URLs generadas para ver los archivos deben ser firmadas (Signed URLs) o descargadas directamente desde el backend, ya que la URL pública lanzará un error 401.
