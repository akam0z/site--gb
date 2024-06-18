document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/messages')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(messages => {
            console.log('Parsed JSON data:', messages);
            const messageList = document.getElementById('messageList');
            messageList.innerHTML = ''; // Clear existing messages
            messages.forEach(message => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${message.name}</td>
                    <td>${message.email}</td>
                    <td>${message.phone}</td>
                    <td>${message.appointment ? new Date(message.appointment).toLocaleString() : ''}</td>
                    <td>${message.message}</td>
                    <td>${new Date(message.date).toLocaleString()}</td>
                `;
                messageList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
});

