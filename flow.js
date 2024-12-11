import { WorkflowService } from './workflowService.js';
import stepConfigs from './stepConfigs.js';

const workflowService = new WorkflowService();

document.addEventListener("DOMContentLoaded", function () {
  showScreen('screen-a');
});

function showScreen(screenId) {
  const screens = document.querySelectorAll('section');
  screens.forEach(screen => screen.classList.add('hidden')); // Hide all screens
  document.getElementById(screenId).classList.remove('hidden'); // Show the current screen
}

// Task A: Analyze news and proceed to Task B
document.querySelector('#screen-a button').addEventListener('click', async function () {
  const newsInput = document.getElementById('news-input').value;
  const linkInput = document.getElementById('link-input').value;

  if (newsInput && linkInput) {
    const result = await workflowService.executeStep(stepConfigs.step1, { newsInput, linkInput });
    document.getElementById('output-text').value = result.analyzedText;
    showScreen('screen-b');
  } else {
    alert("Please fill out both fields.");
  }
});

// Task B: Generate copy and proceed to Task C
document.querySelector('#screen-b button').addEventListener('click', async function () {
  const outputText = document.getElementById('output-text').value;
  if (outputText) {
    const result = await workflowService.executeStep(stepConfigs.step2, { outputText });
    document.getElementById('title').value = result.title;
    document.getElementById('subtitle').value = result.subtitle;
    document.getElementById('text1').value = result.text1;
    showScreen('screen-c');
  } else {
    alert("Output text is required.");
  }
});

// Task C: Generate images or choose from library
document.querySelector('#screen-c button.bg-blue-500').addEventListener('click', async function () {
  const result = await workflowService.executeStep(stepConfigs.step3, {});
  const imgContainer = document.querySelector('#screen-d .grid');
  imgContainer.innerHTML = '';
  result.images.forEach((imgSrc, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.alt = `Post Image 0${index + 1}`;
    imgElement.className = "w-full rounded";
    imgContainer.appendChild(imgElement);
  });

  document.getElementById('caption').value = "Generated caption for the post";
  showScreen('screen-d');
});

// Task D: Back to Task C for further edits
document.querySelector('#screen-d button').addEventListener('click', function () {
  showScreen('screen-c');
});
