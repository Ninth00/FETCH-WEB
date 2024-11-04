const apiUrl = 'http://localhost:3000/tareas';

        function obtenerTareas() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(tareas => {
                    const listaTareas = document.getElementById('lista-tareas');
                    listaTareas.innerHTML = '';
                    tareas.forEach(tarea => {
                        const li = document.createElement('li');
                        li.textContent = tarea.titulo;
                        li.appendChild(createButton('Actualizar', () => actualizarTarea(tarea.id)));
                        li.appendChild(createButton('Eliminar', () => eliminarTarea(tarea.id)));
                        listaTareas.appendChild(li);
                    });
                });
        }

        function agregarTarea() {
            const titulo = document.getElementById('titulo').value;
            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titulo })
            })
            .then(() => {
                document.getElementById('titulo').value = '';
                obtenerTareas();
            });
        }

        function actualizarTarea(id) {
            const nuevoTitulo = prompt('Nuevo título:');
            if (nuevoTitulo) {
                fetch(`${apiUrl}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ titulo: nuevoTitulo })
                })
                .then(obtenerTareas);
            }
        }

        function eliminarTarea(id) {
            fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
                .then(obtenerTareas);
        }

        function createButton(text, onClick) {
            const button = document.createElement('button');
            button.textContent = text;
            button.onclick = onClick;
            return button;
        }

        // Obtener tareas al cargar la página
        window.onload = obtenerTareas;