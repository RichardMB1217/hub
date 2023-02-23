// Get the search form and search results container
const searchForm = document.querySelector('form');
const searchResults = document.querySelector('#searchResults');

// Event listener for search form submit
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get the search term entered by the user
  const searchTerm = document.querySelector('#searchTerm').value;

  // Clear the search results container
  searchResults.innerHTML = '';

  // Fetch video files from Github repository folder using Github API
  fetch(`https://api.github.com/repos/RichardMB1217/hub/contents/ass`)
    .then(response => response.json())
    .then(files => {
      // Filter the files to only include video files that match the search term
      const videos = files.filter(file => file.type === 'file' && file.name.includes(searchTerm) && file.name.endsWith('.mp4'));

      // Loop through the video files and create HTML elements for each video result
      videos.slice(0, 10).forEach(video => {
        const title = video.name.split('(')[0].trim().toLowerCase(); // Extract video title from file name
        const thumbnail = `https://i.ytimg.com/vi/${video.name.substring(0, video.name.length - 4)}/hqdefault.jpg`; // Generate thumbnail image URL

        // Create HTML elements for video result
        const videoResult = document.createElement('div');
        videoResult.classList.add('card', 'mb-3');
        videoResult.innerHTML = `
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="${thumbnail}" class="card-img" alt="${title} thumbnail">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <button type="button" class="btn btn-primary watch-video-button" data-fileurl="https://raw.githubusercontent.com/RichardMB1217/hub/main/ass/${video.name}">Watch Video</button>
              </div>
            </div>
          </div>
        `;

        // Add video result to search results container
        searchResults.appendChild(videoResult);
      });

      // Add event listener to "Watch Video" buttons
      const watchVideoButtons = document.querySelectorAll('.watch-video-button');
      watchVideoButtons.forEach(button => {
        button.addEventListener('click', () => {
          const fileUrl = button.getAttribute('data-fileurl');
          const videoWindow = window.open(fileUrl, '_blank');
          videoWindow.document.write(`<video src="${fileUrl}" controls autoplay style="width:100%;height:100%;position:absolute;top:0;left:0;"></video>`);
        });
      });
    })
    .catch(error => {
      console.error(error);
      searchResults.innerHTML = 'An error occurred while fetching search results.';
    });
});
