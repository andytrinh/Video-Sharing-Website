var videos = [];

function insertVideo(title, videoId) {
  var newVideo = {
    title: title,
    videoId: videoId
  };

  var appendVideo = Handlebars.templates.insertVideo(newVideo);

  var videos = document.getElementById('videos');
  videos.insertAdjacentHTML('beforeend', appendVideo);
}

function newText (title, videoId) {
  var request = new XMLHttpRequest();
  var requestURL = '/addVideo';
  request.open('POST', requestURL);

  var videoOb = {
    title: title,
    videoId: videoId
  };

  var body = JSON.stringify(videoOb);
  request.setRequestHeader('Content-Type', 'application/json');

  request.addEventListener('load', function(event) {
    if (event.target.status !== 200) {
      var message = event.target.response;
      alert ("Error storing video");
    }
    else  {
      insertVideo (title, videoId);
    }
  });

  request.send(body);

}

function deleteVideo (videoId) {
  var request = new XMLHttpRequest();
  var requestURL = '/deleteVideo';
  request.open('POST', requestURL);

  var deleteOb = {
    videoId: videoId
  };

  var body = JSON.stringify(deleteOb);
  request.setRequestHeader('Content-Type', 'application/json');

  request.addEventListener('load', function(event) {
    if (event.target.status !== 200) {
      var message = event.target.response;
      alert ("error deleting video");
    }
    else {
      del (videoId);
    }
  });

  request.send(body);
}

function del (videoId)  {
  var video = document.getElementById(videoId);
  video.remove();
}

function showModal() {

  var modal = document.getElementById('modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  modal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}

function clearModalInputs() {

  var inputs = [
    document.getElementById('video-text-input'),
    document.getElementById('video-source-input'),
  ];

  inputs.forEach(function (input) {
    input.value = '';
  });

}

function hideModal() {

  var modal = document.getElementById('modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  modal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearModalInputs();

}

function modalAccept() {
  var title = document.getElementById('video-text-input').value.trim();
  var url = document.getElementById('video-source-input').value.trim();

  if (!title || !url) {
    alert("You must fill in all of the fields!");
  }
  else {

    var parser = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(parser);
    var videoId;
    if (match && match[2].length == 11) {

      videos.push({
        title: title,
        videoId: videoId
      });

      videoId = match[2];
      newText(title, videoId);
      //insertVideo(title, videoId);
      hideModal();
    } else {
      alert("Please enter a valid URL.");
    }
  }

}

function deleteButton () {
  var button = event.currentTarget;
  var videoPost = button.parentElement;
  var videoId = videoPost.getAttribute('url');
  console.log (videoId);
  deleteVideo(videoId);
}

window.addEventListener('DOMContentLoaded', function () {

  var addVideoButton = document.getElementById('add-video-button');
  if (addVideoButton) {
    addVideoButton.addEventListener('click', showModal) ;
  }

  var postVideoButton = document.getElementById('modal-accept');
  if (postVideoButton) {
    postVideoButton.addEventListener('click', modalAccept);
  }

  var hideModalButton = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < hideModalButton.length; i++) {
    hideModalButton[i].addEventListener('click', hideModal);
  }

  var postDelete = document.getElementsByClassName('post-delete-button');
  for (var i = 0; i < postDelete.length; i++) {
  if (postDelete[i]) {
    postDelete[i].addEventListener('click', deleteButton);
  }
  }

});
