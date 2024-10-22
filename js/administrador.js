document.addEventListener('DOMContentLoaded', async () => {
    const appointmentList = document.getElementById('appointment-list');
    const API_URL = 'http://localhost:3000/appointments';
    let appointments = [];

    const fetchAppointments = async () => {
        const response = await fetch(API_URL);
        appointments = await response.json();
        renderAppointments();
    };

    const renderAppointments = () => {
        appointmentList.innerHTML = '';

        if (appointments.length === 0) {
            appointmentList.innerHTML = '<p>Nenhum agendamento encontrado.</p>';
            return;
        }

        appointments.forEach((appointment, index) => {
            const appointmentItem = document.createElement('div');
            appointmentItem.className = 'appointment-item';
            appointmentItem.innerHTML = `
                <h3>${appointment.title}</h3>
                <p>Data: ${appointment.date}</p>
                <p>Hora: ${appointment.time}</p>
                <p>${appointment.description}</p>
                <button onclick="editAppointment(${index})">Editar</button>
                <button onclick="deleteAppointment(${index})">Excluir</button>
            `;
            appointmentList.appendChild(appointmentItem);
        });
    };

    window.editAppointment = (index) => {
        const appointment = appointments[index];

        document.getElementById('title').value = appointment.title;
        document.getElementById('date').value = appointment.date;
        document.getElementById('time').value = appointment.time;
        document.getElementById('description').value = appointment.description;

        appointments.splice(index, 1);
    };

    window.deleteAppointment = async (index) => {
        appointments.splice(index, 1);
        await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointments[index])
        });
        fetchAppointments();
    };

    fetchAppointments();
});
