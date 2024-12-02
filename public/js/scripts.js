document.addEventListener('DOMContentLoaded', () => {
    const headersChartCtx = document.getElementById('headersChart').getContext('2d');
    const bodyChartCtx = document.getElementById('bodyChart').getContext('2d');

    const headersData = {
        labels: ['Header A', 'Header B', 'Header C'], // Example labels
        datasets: [{
            label: 'Headers',
            data: [12, 19, 3], // Example data
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
    };

    const bodyData = {
        labels: ['Key 1', 'Key 2', 'Key 3'], // Example labels
        datasets: [{
            label: 'Body Data',
            data: [7, 11, 5], // Example data
            backgroundColor: ['#4BC0C0', '#9966FF', '#FF9F40'],
        }]
    };

    new Chart(headersChartCtx, {
        type: 'bar',
        data: headersData,
    });

    new Chart(bodyChartCtx, {
        type: 'pie',
        data: bodyData,
    });
});
