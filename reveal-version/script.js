document.addEventListener('DOMContentLoaded', function() {
  // Initialize Reveal.js
  Reveal.initialize({
    hash: true,
    transition: 'slide',
    transitionSpeed: 'slow',
    backgroundTransition: 'fade',
    center: true,
    progress: true,
    controls: true,
    plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
  });

  // Financial chart
  const ctx = document.getElementById('financialChart').getContext('2d');
  const financialChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      datasets: [
        {
          label: 'Monthly Active Users (k)',
          data: [10, 25, 200, 600, 1500],
          backgroundColor: 'rgba(69, 104, 220, 0.7)',
          borderColor: 'rgba(69, 104, 220, 1)',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'Revenue ($k)',
          data: [0, 27, 342, 1100, 2600],
          backgroundColor: 'rgba(176, 106, 179, 0.7)',
          borderColor: 'rgba(176, 106, 179, 1)',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          position: 'left',
          title: {
            display: true,
            text: 'MAU (thousands)'
          }
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          title: {
            display: true,
            text: 'Revenue ($k)'
          },
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }
  });

  // Add animations for elements when they come into view
  Reveal.on('fragmentshown', event => {
    const fragment = event.fragment;
    if (fragment.classList.contains('pillar')) {
      fragment.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        fragment.style.transform = 'translateY(0)';
      }, 300);
    }
  });
});