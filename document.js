    document.addEventListener('DOMContentLoaded', function() {
        // --- Constantes y Referencias a Elementos del DOM ---
        const LOGIN_SECTION = document.getElementById('login-section');
        const PATIENTS_SECTION = document.getElementById('patients-section');
        const LOGIN_FORM = document.getElementById('login-form');
        const PASSWORD_INPUT = document.getElementById('password');
        const ERROR_MESSAGE = document.getElementById('error-message');
        const LOGOUT_BTN = document.getElementById('logout-btn');
        const PATIENTS_TABLE_BODY = document.getElementById('patients-table-body');

        // --- Contraseña de Acceso ---
        const CORRECT_PASSWORD = 'Ministeriovientos25';

        // --- Datos de Ejemplo de Pacientes ---
        // En una aplicación real, estos datos vendrían de una base de datos o una API.
        const patientsData = [
            { id: 'P-001', name: 'Ana María García', admissionDate: '2024-10-15', addiction: 'Alcohol', status: 'activo', responsible: 'Dr. Carlos Ruiz' },
            { id: 'P-002', name: 'Luis Alberto Torres', admissionDate: '2024-11-01', addiction: 'Cocaína', status: 'en-evaluacion', responsible: 'Dra. Sofía Morales' },
            { id: 'P-003', name: 'Patricia Jiménez Díaz', admissionDate: '2023-05-20', addiction: 'Opioides', status: 'alta', responsible: 'Dr. Carlos Ruiz' },
            { id: 'P-004', name: 'Javier Hernández López', admissionDate: '2024-09-02', addiction: 'Juego', status: 'activo', responsible: 'Dra. Elena Vargas' },
            { id: 'P-005', name: 'Marta Rosa Sánchez', admissionDate: '2024-11-10', admissionDate: 'Benzodiazepinas', status: 'activo', responsible: 'Dr. Carlos Ruiz' },
            { id: 'P-006', name: 'Roberto Méndez Ortiz', admissionDate: '2023-12-01', addiction: 'Alcohol', status: 'inactivo', responsible: 'Dra. Sofía Morales' },
            { id: 'P-007', name: 'Carmen Liliana Peña', admissionDate: '2024-08-18', addiction: 'Nicotina', status: 'en-evaluacion', responsible: 'Dra. Elena Vargas' },
            { id: 'P-008', name: 'Fernando Gómez Castro', admissionDate: '2024-10-28', addiction: 'Cannabis', status: 'activo', responsible: 'Dr. Carlos Ruiz' },
        ];

        // --- Funciones Principales ---

        /**
         * Maneja el evento de envío del formulario de login.
         * Verifica la contraseña y actúa en consecuencia.
         * @param {Event} event - El evento de submit del formulario.
         */
        function handleLogin(event) {
            event.preventDefault(); // Evita que la página se recargue

            const enteredPassword = PASSWORD_INPUT.value;

            if (enteredPassword === CORRECT_PASSWORD) {
                // Contraseña correcta: mostrar sección de pacientes
                showPatientsSection();
            } else {
                // Contraseña incorrecta: mostrar mensaje de error
                showErrorMessage();
            }
        }

        /**
         * Muestra la sección de pacientes y oculta la de login.
         * Carga los datos en la tabla.
         */
        function showPatientsSection() {
            LOGIN_SECTION.style.display = 'none';
            PATIENTS_SECTION.style.display = 'block';
            ERROR_MESSAGE.style.display = 'none'; // Asegurarse de que el error esté oculto
            populatePatientsTable();
        }

        /**
         * Muestra un mensaje de error y lo oculta después de 3 segundos.
         */
        function showErrorMessage() {
            ERROR_MESSAGE.style.display = 'block';
            PASSWORD_INPUT.value = ''; // Limpia el campo de contraseña
            PASSWORD_INPUT.focus();   // Pone el foco de nuevo en el campo

            setTimeout(() => {
                ERROR_MESSAGE.style.display = 'none';
            }, 3000); // Ocultar el mensaje después de 3 segundos
        }

        /**
         * Cierra la sesión, volviendo a mostrar el formulario de login.
         */
        function handleLogout() {
            PATIENTS_SECTION.style.display = 'none';
            LOGIN_SECTION.style.display = 'flex'; // 'flex' para centrar de nuevo
            PASSWORD_INPUT.value = '';
            PASSWORD_INPUT.focus();
        }
        
        /**
         * Genera el HTML de la tabla de pacientes a partir de los datos.
         * Crea las filas y las inserta en el tbody.
         */
        function populatePatientsTable() {
            // Limpiar cualquier contenido previo en la tabla
            PATIENTS_TABLE_BODY.innerHTML = '';

            // Iterar sobre cada paciente y crear una fila
            patientsData.forEach(patient => {
                const row = document.createElement('tr');

                // Crear celdas para cada dato
                row.innerHTML = `
                    <td>${patient.id}</td>
                    <td>${patient.name}</td>
                    <td>${formatDate(patient.admissionDate)}</td>
                    <td>${patient.addiction}</td>
                    <td><span class="status-badge status-${patient.status}">${formatStatus(patient.status)}</span></td>
                    <td>${patient.responsible}</td>
                `;
                
                // Añadir la fila al cuerpo de la tabla
                PATIENTS_TABLE_BODY.appendChild(row);
            });
        }

        /**
         * Formatea una cadena de fecha a un formato más legible (DD/MM/AAAA).
         * @param {string} dateString - La fecha en formato YYYY-MM-DD.
         * @returns {string} La fecha formateada.
         */
        function formatDate(dateString) {
            const date = new Date(dateString);
            // Usar opciones de localización para un formato robusto
            return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }

        /**
         * Convierte un identificador de estado (ej. 'activo') a un texto legible (ej. 'Activo').
         * @param {string} status - El identificador del estado.
         * @returns {string} El texto formateado.
         */
        function formatStatus(status) {
            // Reemplaza guiones por espacios y pone la primera letra en mayúscula
            return status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        }

        // --- Asignación de Event Listeners ---
        LOGIN_FORM.addEventListener('submit', handleLogin);
        LOGOUT_BTN.addEventListener('click', handleLogout);

    });
