
// // NASA API Key and Endpoint
// const apiKey = "0SX5c4vkfkowyx7FPeSyi8QuJKShjjo1esT4mCOp"; // Replace with your NASA API key
// const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=1`; // 'count=1' ensures a new random image

// // Hugging Face API Key and Model Endpoint
// const hfApiKey = "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"; // Replace with your Hugging Face API key
// const hfModelURL = "https://api-inference.huggingface.co/models/google/flan-t5-large"; // Using Flan-T5 for quiz generation

// let correctAnswers = []; // Array to store correct answers

// // Fetch Astronomy Image and Information from NASA API
// function fetchAstronomyImage() {
//     fetch(apiURL)
//         .then(response => response.json())
//         .then(data => {
//             const astroData = data[0]; // Get the first item from the response
//             document.getElementById('astro-image').src = astroData.url;
//             document.getElementById('astro-title').innerText = astroData.title;
//             document.getElementById('astro-description').innerText = astroData.explanation;
//         })
//         .catch(error => {
//             console.error("Error fetching NASA API data:", error);
//         });
// }

// // Function to call Hugging Face API and generate 5 quiz questions
// function generateQuiz(astroDescription) {
//     // Prepare textual data for the model
//     const truncatedDescription = astroDescription.length > 500 ? astroDescription.substring(0, 500) + "..." : astroDescription;

//     // Request for 5 different quiz questions with a maximum token length of 1000
//     const prompt = `Generate 5 different multiple-choice quiz questions with options from the following description: ${truncatedDescription}`;

//     fetch(hfModelURL, {
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${hfApiKey}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             inputs: prompt,
//             parameters: {
//                 max_length: 1000 // Setting token length to 1000
//             },
//             options: { wait_for_model: true }
//         })
//     })
//     .then(response => {
//         // Log the entire response to debug structure
//         return response.json().then(data => {
//             console.log("Hugging Face API Response:", data);
//             return data;
//         });
//     })
//     .then(data => {
//         // Check for different response formats
//         if (data && typeof data === 'object' && data[0] && data[0].generated_text) {
//             const quizQuestions = data[0].generated_text.trim(); // Handle model returning array
//             displayQuiz(quizQuestions);
//         } else if (data.generated_text) {
//             const quizQuestions = data.generated_text.trim(); // Handle normal structure
//             displayQuiz(quizQuestions);
//         } else if (data.error) {
//             console.error("Hugging Face API Error:", data.error);
//             alert(`Error: ${data.error}`);
//         } else {
//             console.error("Unexpected response format:", data);
//             alert("Unexpected response format. Check console for details.");
//         }
//     })
//     .catch(error => {
//         console.error("Error generating quiz:", error);
//         alert("Failed to generate quiz. Please check the console for details.");
//     });
// }

// // Function to display the generated quiz on the page
// function displayQuiz(quizQuestions) {
//     const quizContent = document.getElementById("quiz-content");
//     const questionsArray = quizQuestions.split("Question: "); // Split questions by "Question:" prefix
//     quizContent.innerHTML = "";
//     correctAnswers = []; // Reset correct answers for each new quiz

//     // Limit to 5 questions and ensure options are displayed properly
//     questionsArray.slice(1, 6).forEach((questionBlock, index) => {
//         const [questionPart, optionsPart] = questionBlock.split("Options:"); // Split into question and options
//         const options = optionsPart ? optionsPart.split(/[A-D]\s+/).filter(option => option.trim() !== "") : [];

//         const questionContainer = document.createElement('div');
//         questionContainer.classList.add('question-container'); // Add a separate container for each question

//         questionContainer.innerHTML += `<p><strong>Question ${index + 1}:</strong> ${questionPart.trim()}</p>`;

//         // Loop through options and display them in separate lines
//         options.forEach((option, optionIndex) => {
//             const isCorrect = option.includes("Answer:");
//             const cleanedOption = option.replace("Answer:", "").trim(); // Clean the marker for correct answer

//             if (isCorrect) {
//                 correctAnswers.push(optionIndex); // Store the correct answer's index
//             }

//             // Display each option as a radio button
//             questionContainer.innerHTML += `
//                 <label>
//                     <input type="radio" name="question${index}" value="${optionIndex}">
//                     ${String.fromCharCode(65 + optionIndex)}. ${cleanedOption}
//                 </label><br>
//             `;
//         });

//         quizContent.appendChild(questionContainer); // Append the question container to the main quiz content
//     });

//     // Add a submit button at the end of all questions
//     quizContent.innerHTML += `<button onclick="submitQuiz()">Submit Answers</button>`;
// }

// // Fetch the image and description when the page loads
// document.addEventListener('DOMContentLoaded', function() {
//     fetchAstronomyImage();
// });

// // Event listener for generating quiz when button is clicked
// document.getElementById('generate-quiz').addEventListener('click', function() {
//     const astroDescription = document.getElementById('astro-description').innerText;
//     generateQuiz(astroDescription);
// });

// // Function to handle quiz submission and display result
// function submitQuiz() {
//     const resultDiv = document.getElementById("result");
//     let score = 0;

//     correctAnswers.forEach((correctAnswer, index) => {
//         const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
//         if (selectedOption && parseInt(selectedOption.value) === correctAnswer) {
//             score += 1; // Increment score for each correct answer
//         }
//     });

//     resultDiv.innerHTML = `You scored ${score} out of ${correctAnswers.length}!`;
// }


// NASA API Key and Endpoint
const apiKey = "0SX5c4vkfkowyx7FPeSyi8QuJKShjjo1esT4mCOp";
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=1`;

// Hugging Face API Key and Model Endpoint
const hfApiKey = "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";
const hfModelURL = "https://api-inference.huggingface.co/models/google/flan-t5-large";

let correctAnswers = [];

function fetchAstronomyImage() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const astroData = data[0];
            const imgElement = document.getElementById('astro-image');
            imgElement.src = astroData.url;
            imgElement.onerror = function() {
                console.error("Failed to load image:", astroData.url);
                imgElement.alt = "Failed to load image";
            };
            document.getElementById('astro-title').innerText = astroData.title;
            document.getElementById('astro-description').innerText = astroData.explanation;
        })
        .catch(error => {
            console.error("Error fetching NASA API data:", error);
        });
}

function generateQuiz(astroDescription) {
    const truncatedDescription = astroDescription.length > 1000 ? astroDescription.substring(0, 1000) + "..." : astroDescription;
    const prompt = `Generate 5 multiple-choice quiz questions based on this astronomy description. Each question should have 4 options (A, B, C, D) with one correct answer.

    Description: ${truncatedDescription}`;

    fetch(hfModelURL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${hfApiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputs: prompt,
            parameters: {
                max_length: 3000,
                temperature: 0.7
            },
            options: { wait_for_model: true }
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Raw API response:", JSON.stringify(data, null, 2));

        let generatedText;
        if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
            generatedText = data[0].generated_text;
        } else if (data && data.generated_text) {
            generatedText = data.generated_text;
        } else {
            throw new Error("Unexpected response format");
        }

        console.log("Generated text:", generatedText);
        const questions = generateQuestionsFromPartialResponse(generatedText, astroDescription);
        displayQuiz(questions);
    })
    .catch(error => {
        console.error("Error generating quiz:", error);
        alert("Failed to generate quiz. Please check the console for details.");
    });
}

function generateQuestionsFromPartialResponse(partialResponse, astroDescription) {
    const questions = [];
    const lines = partialResponse.split('\n').filter(line => line.trim() !== '');

    for (let i = 0; i < 5; i++) {
        const questionText = lines[i] || `Question ${i + 1} about the astronomy image:`;
        const options = generateOptions(astroDescription);
        const correctAnswer = Math.floor(Math.random() * 4);

        questions.push({
            question: questionText,
            options: options,
            correctAnswer: correctAnswer
        });
    }

    return questions;
}

function generateOptions(astroDescription) {
    const keywords = astroDescription.split(/\s+/).filter(word => word.length > 4);
    const options = [];

    for (let i = 0; i < 4; i++) {
        const randomWord = keywords[Math.floor(Math.random() * keywords.length)];
        options.push(`Option related to ${randomWord}`);
    }

    return options;
}

function displayQuiz(questions) {
    console.log("Displaying quiz:", questions);
    const quizContent = document.getElementById("quiz-content");
    quizContent.innerHTML = "";
    correctAnswers = [];

    questions.forEach((question, index) => {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');
        questionContainer.innerHTML = `<p><strong>Question ${index + 1}:</strong> ${question.question}</p>`;

        question.options.forEach((option, optionIndex) => {
            questionContainer.innerHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${optionIndex}">
                    ${String.fromCharCode(65 + optionIndex)}. ${option}
                </label><br>
            `;
        });

        correctAnswers.push(question.correctAnswer);
        quizContent.appendChild(questionContainer);
    });

    quizContent.innerHTML += `<button onclick="submitQuiz()">Submit Answers</button>`;
}

document.addEventListener('DOMContentLoaded', fetchAstronomyImage);

document.getElementById('generate-quiz').addEventListener('click', function() {
    const astroDescription = document.getElementById('astro-description').innerText;
    generateQuiz(astroDescription);
});

function submitQuiz() {
    const resultDiv = document.getElementById("result");
    let score = 0;

    correctAnswers.forEach((correctAnswer, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === correctAnswer) {
            score += 1;
        }
    });

    resultDiv.innerHTML = `You scored ${score} out of ${correctAnswers.length}!`;
}