document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form');
    const API_URL = 'http://localhost:3000/appointments';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const description = document.getElementById('description').value;

        const dateTime = new Date(`${date}T${time}`);
        const oneHourInMs = 60 * 60 * 1000;
        const response = await fetch(API_URL);
        const appointments = await response.json();

        const isValidTime = appointments.every(appointment => {
            const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
            return appointment.date !== date || Math.abs(dateTime - appointmentDateTime) >= oneHourInMs;
        });

        if (!isValidTime) {
            alert('Os agendamentos no mesmo dia devem ter pelo menos uma hora de diferença.');
            return;
        }

        const appointment = {
            title,
            date,
            time,
            description
        };

        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment)
        });

        form.reset();
    });
});
